import React, { useState, useEffect, FormEvent } from 'react';
import { BaseError, useAccount } from 'wagmi';
import { parseUnits } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import jatEngineAbi from "../../../abis/jatEngine.json";
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { middleEllipsis } from '@/lib/format-address';

interface BorrowJatCoinContentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tokenInvolved: "WETH" | "WBTC";
}

const BorrowJatCoinContent: React.FC<BorrowJatCoinContentProps> = ({ open, onOpenChange, tokenInvolved }) => {
    const queryClient = useQueryClient();
    const { address: userAddress } = useAccount();

    const [wethAddress, setWethAddress] = useState<string>('');
    const [wbtcAddress, setWbtcAddress] = useState<string>('');
    const [borrowAmount, setBorrowAmount] = useState<string>('1000');
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>(tokenInvolved);
    const [showReceipt, setShowReceipt] = useState<boolean>(false);

    const { data: collateralAddresses, isError, isLoading, error: errorReadContract } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getCollateralAddresses',
    });
    console.error("this is the error", { errorReadContract });
    useEffect(() => {
        if (collateralAddresses && Array.isArray(collateralAddresses)) {
            setWethAddress(collateralAddresses[0]);
            setWbtcAddress(collateralAddresses[1]);
        }
    }, [collateralAddresses]);

    const {
        data: hash,
        error: writeContractError,
        isPending: isPendingWriteContract,
        writeContractAsync
    } = useWriteContract();

    const { data: receipt, isLoading: isConfirming, isSuccess: isConfirmed, error: waitForReceiptError } =
        useWaitForTransactionReceipt({
            hash,
        });

    useEffect(() => {
        if (isConfirming && !isPendingWriteContract) {
            setShowReceipt(true);
        }
        if (isConfirmed) {
            setTimeout(() => {
                setShowReceipt(false);
                onOpenChange(false);
            }, 9000);
        }
    }, [isConfirming, isPendingWriteContract, isConfirmed, onOpenChange]);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const tokenAddress = selectedToken === 'WETH' ? wethAddress : wbtcAddress;
        const decimals = 18;
        const formattedAmount = parseUnits(borrowAmount, decimals);

        try {
            await writeContractAsync({
                address: JATENGINE_CONTRACT_ADDRESS,
                abi: jatEngineAbi,
                functionName: 'borrowJatCoin',
                args: [formattedAmount, tokenAddress],
            }, {
                onSuccess(data) {
                    toast.success('JatCoin borrowed successfully!');
                    queryClient.invalidateQueries();
                },
                onError(error) {
                    toast.error('Failed to borrow JatCoin. Please try again.');
                },
            });
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

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

    return (
        <div className="p-4 bg-card text-card-foreground rounded-lg shadow-lg w-full max-w-md mx-auto">
            {showReceipt || isConfirmed ? (
                <>
                    {showReceipt && (
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 rounded-lg w-full max-w-md flex items-center justify-center">
                                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                                <span>Awaiting the transaction receipt... Please wait...</span>
                            </div>
                        </div>
                    )}
                    {isConfirmed && renderReceipt(receipt)}
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-4 text-center">Borrow JatCoin</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
                            <Input
                                id="amount"
                                type="number"
                                value={borrowAmount}
                                onChange={(e) => setBorrowAmount(e.target.value)}
                                className="w-full"
                                placeholder="Enter amount to borrow"
                            />
                        </div>
                        <div>
                            <label htmlFor="token" className="block text-sm font-medium mb-1">Token</label>
                            <Select
                                value={selectedToken}
                                onValueChange={(value: 'WETH' | 'WBTC') => setSelectedToken(value)}
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
                            disabled={isPendingWriteContract || isConfirming}
                        >
                            {isPendingWriteContract || isConfirming ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Borrowing...
                                </>
                            ) : (
                                'Borrow JatCoin'
                            )}
                        </Button>
                    </form>
                    {writeContractError && (
                        //@ts-ignore
                        <div className='flex flex-col justify-center items-center'>
                            <div className="mt-4 text-red-500">
                                Error: {(writeContractError as BaseError).shortMessage || writeContractError.message}
                            </div>
                            <div>
                                Error: {(writeContractError as BaseError).metaMessages?.[0] ?? writeContractError.message}
                            </div>
                        </div>
                    )}
                    {waitForReceiptError && (
                        //@ts-ignore
                        <div className='flex flex-col justify-center items-center'>
                            <div className="mt-4 text-red-500">
                                Error: {(waitForReceiptError as BaseError).shortMessage || waitForReceiptError.message}
                            </div>
                            <div>
                                Error: {(waitForReceiptError as BaseError).metaMessages?.[0] ?? waitForReceiptError.message}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BorrowJatCoinContent;
