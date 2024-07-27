import React, { useState, FormEvent } from 'react';
import { useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';
import jatEngineAbi from "../../../abis/jatEngine.json";
import erc20Abi from "../../../abis/erc20Mock.json";
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';

interface DepositCollateralContentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const DepositCollateralContent: React.FC<DepositCollateralContentProps> = ({ open, onOpenChange }) => {
    console.log('DepositCollateralContent component rendered');
    const queryClient = useQueryClient()

    const { address: userAddress } = useAccount();
    console.log('User address:', userAddress);

    const [wethAddress, setWethAddress] = useState<string>('');
    const [wbtcAddress, setWbtcAddress] = useState<string>('');
    const [depositAmount, setDepositAmount] = useState<string>('0.1');
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH');

    console.log('Initial state:', { wethAddress, wbtcAddress, depositAmount, selectedToken });

    const { data: collateralAddresses, isError, isLoading, error: errorReadContract } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getCollateralAddresses',
    });
    console.log('useReadContract result:', { collateralAddresses, isError, isLoading, errorReadContract });

    React.useEffect(() => {
        console.log('useEffect triggered with collateralAddresses:', collateralAddresses);
        if (collateralAddresses && Array.isArray(collateralAddresses)) {
            setWethAddress(collateralAddresses[0]);
            setWbtcAddress(collateralAddresses[1]);
            console.log('Updated addresses:', { weth: collateralAddresses[0], wbtc: collateralAddresses[1] });
        }
    }, [collateralAddresses]);

    const {
        data: approveHash,
        error: approveError,
        isPending: isApprovePending,
        writeContractAsync: approveAsync
    } = useWriteContract();
    console.log("this is the approveAsync error message", { approveError });

    const {
        data: depositHash,
        error: depositError,
        isPending: isDepositPending,
        writeContractAsync: depositAsync
    } = useWriteContract();

    const {
        isLoading: isApproveConfirming,
        isSuccess: isApproveConfirmed,
        error: approveReceiptError
    } = useWaitForTransactionReceipt({
        hash: approveHash,
    });
    console.log("this is the approveReceiptError error message", { approveReceiptError });
    const {
        isLoading: isDepositConfirming,
        isSuccess: isDepositConfirmed,
        error: depositReceiptError,

    } = useWaitForTransactionReceipt({
        hash: depositHash,
    });

    console.log('Approve transaction status:', { isApproveConfirming, isApproveConfirmed });
    console.log('Deposit transaction status:', { isDepositConfirming, isDepositConfirmed });

    async function submit(e: FormEvent<HTMLFormElement>) {
        console.log('Form submitted');
        e.preventDefault();
        const tokenAddress = selectedToken === 'WETH' ? wethAddress : wbtcAddress;
        const decimals = 18; // Both WETH and WBTC use 18 decimals
        const formattedAmount = parseUnits(depositAmount, decimals);

        console.log('Deposit details:', { selectedToken, tokenAddress, decimals, depositAmount, formattedAmount });

        try {
            // First, approve the JatEngine contract to spend tokens
            console.log('Initiating approve transaction');
            const approveResult = await approveAsync({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [JATENGINE_CONTRACT_ADDRESS, formattedAmount],
            });
            console.log('Approve transaction sent:', approveResult);

            // Wait for the approve transaction to be confirmed
            await new Promise<void>((resolve) => {
                if (isApproveConfirmed) resolve();
                const interval = setInterval(() => {
                    if (isApproveConfirmed) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 1000);
            });

            console.log('Approve transaction confirmed');

            // Then, deposit the collateral
            console.log('Initiating deposit transaction');
            const depositResult = await depositAsync({
                address: JATENGINE_CONTRACT_ADDRESS,
                abi: jatEngineAbi,
                functionName: 'depositCollateral',
                args: [tokenAddress, formattedAmount, userAddress],
            });
            console.log('Deposit transaction sent:', depositResult);

            // Wait for the deposit transaction to be confirmed
            await new Promise<void>((resolve) => {
                if (isDepositConfirmed) resolve();
                const interval = setInterval(() => {
                    if (isDepositConfirmed) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 1000);
            });

            console.log('Deposit transaction confirmed');
            toast.success('Collateral deposited successfully!');
            onOpenChange(false);
            queryClient.invalidateQueries();
        } catch (error) {
            console.error('Error in transaction process:', error);
            toast.error('An error occurred during the transaction. Please try again.');
        }
    }

    console.log("Approve error:", approveError);
    console.log("Deposit error:", depositError);
    console.log("Approve receipt error:", approveReceiptError);
    console.log("Deposit receipt error:", depositReceiptError);

    const isTransactionInProgress = isApprovePending || isApproveConfirming || isDepositPending || isDepositConfirming;

    return (
        <div className="p-4 bg-card text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Deposit Collateral</h3>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
                    <Input
                        id="amount"
                        type="number"
                        value={depositAmount}
                        onChange={(e) => {
                            console.log('Amount changed:', e.target.value);
                            setDepositAmount(e.target.value);
                        }}
                        className="w-full"
                        placeholder="Enter amount to deposit"
                        step="0.000001"
                    />
                </div>
                <div>
                    <label htmlFor="token" className="block text-sm font-medium mb-1">Token</label>
                    <Select
                        value={selectedToken}
                        onValueChange={(value: 'WETH' | 'WBTC') => {
                            console.log('Token selected:', value);
                            setSelectedToken(value);
                        }}
                    >
                        <SelectTrigger id="token">
                            <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WETH">WETH</SelectItem>
                            <SelectItem value="WBTC">WBTC</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isTransactionInProgress}
                >
                    {isTransactionInProgress ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Deposit Collateral'
                    )}
                </Button>
                {isApprovePending && (
                    <p className="text-xs text-center text-muted-foreground mt-2">Approving token spend...</p>
                )}
                {isApproveConfirming && (
                    <p className="text-xs text-center text-muted-foreground mt-2">Waiting for approval confirmation...</p>
                )}
                {isDepositPending && (
                    <p className="text-xs text-center text-muted-foreground mt-2">Depositing collateral...</p>
                )}
                {isDepositConfirming && (
                    <p className="text-xs text-center text-muted-foreground mt-2">Waiting for deposit confirmation...</p>
                )}
            </form>
            {(approveError || depositError || approveReceiptError || depositReceiptError) && (
                <div className="mt-4 text-destructive text-xs">
                    <p>Error occurred:</p>
                    <ul className="list-disc list-inside">
                        {approveError && <li>Approve Error: {(approveError as Error).message}</li>}
                        {depositError && <li>Deposit Error: {(depositError as Error).message}</li>}
                        {approveReceiptError && <li>Approve Receipt Error: {(approveReceiptError as Error).message}</li>}
                        {depositReceiptError && <li>Deposit Receipt Error: {(depositReceiptError as Error).message}</li>}
                    </ul>
                </div>
            )}
            {isLoading && <p className="mt-2 text-xs text-muted-foreground">Loading collateral addresses...</p>}
            {isError && (
                <p className="mt-2 text-xs text-destructive">
                    Error loading collateral addresses: {(errorReadContract as Error).message}
                </p>
            )}
        </div>
    );
};

export default DepositCollateralContent;

