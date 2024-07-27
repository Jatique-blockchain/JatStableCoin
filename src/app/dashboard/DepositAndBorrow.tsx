import React, { useState, useEffect } from 'react';
import { BaseError, useAccount } from 'wagmi';
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
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { middleEllipsis } from '@/lib/format-address';

interface DepositAndBorrowProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tokenToDeposit: "WETH" | "WBTC";
}

const DepositAndBorrow: React.FC<DepositAndBorrowProps> = ({ open, onOpenChange, tokenToDeposit }) => {
    const queryClient = useQueryClient();
    const [showReceipt, setShowReceipt] = useState<boolean>(false);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [isApproving, setIsApproving] = useState<boolean>(false);

    const { address: userAddress } = useAccount();

    const [wethAddress, setWethAddress] = useState<string>('');
    const [wbtcAddress, setWbtcAddress] = useState<string>('');
    const [depositAmount, setDepositAmount] = useState<string>('0.1');
    const [borrowAmount, setBorrowAmount] = useState<string>('0.08');
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>(tokenToDeposit);
    const [maxBorrow, setMaxBorrow] = useState<boolean>(false);

    const { data: collateralAddresses, isError, isLoading, error: errorReadContract } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getCollateralAddresses',
    });

    useEffect(() => {
        if (collateralAddresses && Array.isArray(collateralAddresses)) {
            setWethAddress(collateralAddresses[0]);
            setWbtcAddress(collateralAddresses[1]);
        }
    }, [collateralAddresses]);

    useEffect(() => {
        if (maxBorrow) {
            const maxBorrowAmount = (parseFloat(depositAmount) * 0.8).toFixed(6);
            setBorrowAmount(maxBorrowAmount);
        }
    }, [depositAmount, maxBorrow]);

    const {
        data: approveHash,
        error: approveError,
        isPending: isApprovePending,
        writeContractAsync: approveAsync
    } = useWriteContract();
    const {
        isLoading: isApproveConfirming,
        isSuccess: isApproveConfirmed,
        error: approveReceiptError
    } = useWaitForTransactionReceipt({
        hash: approveHash,
    });
    const {
        data: depositHash,
        error: depositError,
        isPending: isDepositPending,
        writeContractAsync: depositAsync
    } = useWriteContract();
    const {
        isLoading: isDepositConfirming,
        data: receipt,
        isSuccess: isDepositConfirmed,
        error: depositReceiptError
    } = useWaitForTransactionReceipt({
        hash: depositHash,
    });

    useEffect(() => {
        if (isDepositConfirmed && !isDepositPending) {
            setShowReceipt(true);
        }
        if (isDepositConfirmed) {
            setTimeout(() => {
                setShowReceipt(false);
                onOpenChange(false);
            }, 4000);
        }
    }, [isDepositConfirmed, isDepositPending, onOpenChange]);

    useEffect(() => {
        if (isApproveConfirmed) {
            setIsApproved(true);
            setIsApproving(false);
            toast.success('Token spend approved successfully!');
        }
    }, [isApproveConfirmed]);

    const handleApprove = async () => {
        const tokenAddress = selectedToken === 'WETH' ? wethAddress : wbtcAddress;
        const decimals = 18; // Both WETH and WBTC use 18 decimals
        const formattedDepositAmount = parseUnits(depositAmount, decimals);

        try {
            setIsApproving(true);
            // Approve the JatEngine contract to spend tokens
            await approveAsync({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [JATENGINE_CONTRACT_ADDRESS, formattedDepositAmount],
            });
        } catch (error) {
            console.error('Error in approval process:', error);
            toast.error('An error occurred during the approval. Please try again.');
            setIsApproving(false);
        }
    };

    const handleDepositAndBorrow = async () => {
        const tokenAddress = selectedToken === 'WETH' ? wethAddress : wbtcAddress;
        const decimals = 18; // Both WETH and WBTC use 18 decimals
        const formattedDepositAmount = parseUnits(depositAmount, decimals);
        const formattedBorrowAmount = parseUnits(borrowAmount, decimals);

        try {
            // Deposit the collateral and borrow
            await depositAsync({
                address: JATENGINE_CONTRACT_ADDRESS,
                abi: jatEngineAbi,
                functionName: 'depositAndBorrow',
                args: [tokenAddress, formattedDepositAmount, formattedBorrowAmount],
            });

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

            toast.success('Collateral deposited and JatCoin borrowed successfully!');
            queryClient.invalidateQueries();
            onOpenChange(false);
        } catch (error) {
            console.error('Error in transaction process:', error);
            toast.error('An error occurred during the transaction. Please try again.');
        }
    };

    const renderReceipt = (receipt: any) => {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="p-4 rounded-lg w-full max-w-md">
                    <div className="flex items-center justify-center mb-2">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <p className="text-center font-semibold">Transaction confirmed!</p>
                    </div>
                    <p className="text-center mt-2">Transaction hash: {receipt.transactionHash ? middleEllipsis(receipt.transactionHash, 12) : ''}</p>
                    <p className='text-center mt-2 font-bold'>Transaction Receipt</p>
                    <div className='max-h-[10rem] overflow-auto'>
                        <pre className="text-xs overflow-auto mt-2">{JSON.stringify(receipt, (key, value) =>
                            typeof value === 'bigint' ? value.toString() : value, 2)}</pre>
                    </div>
                </div>
            </div>
        );
    };

    const isTransactionInProgress = isApprovePending || isApproveConfirming || isDepositPending || isDepositConfirming || isApproving;

    return (
        <div className="p-4 bg-card text-card-foreground rounded-lg shadow-lg">
            {showReceipt || isDepositConfirmed ? (
                <>
                    {showReceipt && (
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 rounded-lg w-full max-w-md flex items-center justify-center">
                                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                                <span>Awaiting the transaction receipt... Please wait...</span>
                            </div>
                        </div>
                    )}
                    {isDepositConfirmed && renderReceipt(receipt)}
                </>
            ) : (
                <>
                    {isApproveConfirming && (
                        <p className="text-xs text-center text-muted-foreground mt-2">Waiting for approval confirmation...</p>
                    )}
                    <h3 className="text-lg font-semibold mb-4">Deposit Collateral</h3>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount to Deposit</label>
                            <Input
                                id="amount"
                                type="number"
                                value={depositAmount}
                                onChange={(e) => {
                                    setDepositAmount(e.target.value);
                                }}
                                className="w-full"
                                placeholder="Enter amount to deposit"
                                step="0.000001"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="maxBorrow"
                                checked={maxBorrow}
                                onChange={(e) => setMaxBorrow(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="maxBorrow" className="text-sm font-medium">Borrow Maximum Amount (80% of Deposit)</label>
                        </div>
                        <div>
                            <label htmlFor="borrowAmount" className="block text-sm font-medium mb-1">Amount to Borrow</label>
                            <Input
                                id="borrowAmount"
                                type="number"
                                value={borrowAmount}
                                onChange={(e) => {
                                    if (!maxBorrow) {
                                        setBorrowAmount(e.target.value);
                                    }
                                }}
                                className="w-full"
                                placeholder="Enter amount to borrow"
                                step="0.000001"
                                disabled={maxBorrow}
                            />
                        </div>
                        <div>
                            <label htmlFor="token" className="block text-sm font-medium mb-1">Token</label>
                            <Select
                                value={selectedToken}
                                onValueChange={(value: 'WETH' | 'WBTC') => {
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
                            type="button"
                            className="w-full"
                            onClick={isApproved ? handleDepositAndBorrow : handleApprove}
                            disabled={isTransactionInProgress}
                        >
                            {isTransactionInProgress ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                isApproved ? 'Deposit Collateral and Borrow' : 'Approve Token Spend'
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
                                {approveError && (
                                    <li>
                                        Approve Error: {(approveError as BaseError)?.shortMessage} {(approveError as BaseError)?.metaMessages?.[0] && `- ${(approveError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {depositError && (
                                    <li>
                                        Deposit Error: {(depositError as BaseError)?.shortMessage} {(depositError as BaseError)?.metaMessages?.[0] && `- ${(depositError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {approveReceiptError && (
                                    <li>
                                        Approve Receipt Error: {(approveReceiptError as BaseError)?.shortMessage} {(approveReceiptError as BaseError)?.metaMessages?.[0] && `- ${(approveReceiptError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {depositReceiptError && (
                                    <li>
                                        Deposit Receipt Error: {(depositReceiptError as BaseError)?.shortMessage} {(depositReceiptError as BaseError)?.metaMessages?.[0] && `- ${(depositReceiptError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                            </ul>


                        </div>
                    )}
                    {isLoading && <p className="mt-2 text-xs text-muted-foreground">Loading collateral addresses...</p>}
                    {isError && (
                        <p className="mt-2 text-xs text-destructive">
                            Error loading collateral addresses: {(errorReadContract as Error).message}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default DepositAndBorrow;

