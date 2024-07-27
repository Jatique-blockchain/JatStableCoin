import React, { useState, useEffect, FormEvent } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import jatEngineAbi from "../../../../abis/jatEngine.json";
import erc20Abi from "../../../../abis/erc20Mock.json"; // Assuming this is the correct path
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { BaseError, formatUnits, parseUnits } from 'viem';
import { middleEllipsis } from '@/lib/format-address';
import { BorrowDetailsWithInterest } from '../borrowTable/types';

interface LiquidateUserProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    borrowDetails: BorrowDetailsWithInterest | null;
    collateralAddress: string;
}

const LiquidateUser: React.FC<LiquidateUserProps> = ({ open, onOpenChange, borrowDetails, collateralAddress }) => {
    const queryClient = useQueryClient();
    const [repayAmount, setRepayAmount] = useState<string>('1000');
    const [showReceipt, setShowReceipt] = useState<boolean>(false);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [isApproving, setIsApproving] = useState<boolean>(false);
    const { address: userAddress } = useAccount();

    const {
        data: jatCoinAddress,
        isError: isErrorJatCoinAddress,
        isLoading: isLoadingJatCoinAddress,
        error: errorJatCoinAddress
    } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getJatCoinAddress',
    });

    const {
        data: approveHash,
        error: approveError,
        isPending: isApprovePending,
        writeContractAsync: approveAsync
    } = useWriteContract();

    const {
        data: liquidateHash,
        error: liquidateError,
        isPending: isLiquidatePending,
        writeContractAsync: liquidateAsync
    } = useWriteContract();

    const {
        isLoading: isApproveConfirming,
        isSuccess: isApproveConfirmed,
        error: approveReceiptError
    } = useWaitForTransactionReceipt({
        hash: approveHash,
    });

    const {
        isLoading: isLiquidateConfirming,
        data: receipt,
        isSuccess: isLiquidateConfirmed,
        error: liquidateReceiptError
    } = useWaitForTransactionReceipt({
        hash: liquidateHash,
    });

    useEffect(() => {
        if (isApproveConfirmed) {
            setIsApproved(true);
            setIsApproving(false);
            toast.success('Token spend approved successfully!');
        }
    }, [isApproveConfirmed]);

    useEffect(() => {
        if (isLiquidateConfirming && !isLiquidatePending) {
            setShowReceipt(true);
        }
        if (isLiquidateConfirmed) {
            setTimeout(() => {
                setShowReceipt(false);
                onOpenChange(false);
            }, 9000);
        }
    }, [isLiquidateConfirming, isLiquidatePending, isLiquidateConfirmed, onOpenChange]);

    const handleApprove = async () => {
        if (!jatCoinAddress) return;

        try {
            setIsApproving(true);
            await approveAsync({
                address: jatCoinAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [JATENGINE_CONTRACT_ADDRESS, parseUnits(repayAmount, 18)],
            });
        } catch (error) {
            console.error('Error in approval process:', error);
            toast.error('An error occurred during the approval. Please try again.');
            setIsApproving(false);
        }
    };

    const handleLiquidate = async () => {
        const formattedAmount = parseUnits(repayAmount, 18);
        if (!borrowDetails?.borrowDetails.id || !borrowDetails?.borrowDetails.user) {
            toast.error('Please provide valid borrowId and borrower address');
            return;
        }
        try {
            console.log("Liquidating user with borrowId:", borrowDetails?.borrowDetails.id, "and amount:", formattedAmount);
            await liquidateAsync({
                address: JATENGINE_CONTRACT_ADDRESS,
                abi: jatEngineAbi,
                functionName: 'liquidate',
                args: [borrowDetails?.borrowDetails.user, parseUnits(borrowDetails?.borrowDetails.id.toString(), 0), formattedAmount],
            });

            toast.success('Liquidation successful!');
            queryClient.invalidateQueries();
        } catch (error) {
            console.error('Error in liquidation process:', error);
            toast.error('Failed to liquidate. Please try again.');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    console.log("Errors:", { approveError, liquidateError, approveReceiptError, liquidateReceiptError });
    const isTransactionInProgress = isApprovePending || isApproveConfirming || isLiquidatePending || isLiquidateConfirming;

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
            {showReceipt || isLiquidateConfirmed ? (
                <>
                    {showReceipt && (
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 rounded-lg w-full max-w-md flex items-center justify-center">
                                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                                <span>Awaiting the transaction receipt... Please wait...</span>
                            </div>
                        </div>
                    )}
                    {isLiquidateConfirmed && renderReceipt(receipt)}
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-4 text-center">Liquidate User</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
                            <Input
                                id="amount"
                                type="number"
                                value={repayAmount}
                                onChange={(e) => setRepayAmount(e.target.value)}
                                className="w-full"
                                placeholder="Enter amount to liquidate"
                            />
                        </div>
                        <Button
                            type="button"
                            className="w-full mt-4"
                            onClick={isApproved ? handleLiquidate : handleApprove}
                            disabled={isTransactionInProgress}
                        >
                            {isTransactionInProgress ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                isApproved ? 'Liquidate User' : 'Approve Token Spend'
                            )}
                        </Button>
                        {isApprovePending && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Approving token spend...</p>
                        )}
                        {isApproveConfirming && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Waiting for approval confirmation...</p>
                        )}
                        {isLiquidatePending && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Processing liquidation...</p>
                        )}
                        {isLiquidateConfirming && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Waiting for liquidation confirmation...</p>
                        )}
                    </form>
                    {(approveError || liquidateError || approveReceiptError || liquidateReceiptError) && (
                        <div className="mt-4 text-destructive text-xs">
                            <p>Error occurred:</p>
                            <ul className="list-disc list-inside">
                                {approveError && (
                                    <li>
                                        Approve Error: {(approveError as BaseError)?.shortMessage} {(approveError as BaseError)?.metaMessages?.[0] && `- ${(approveError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {liquidateError && (
                                    <li>
                                        Deposit Error: {(liquidateError as BaseError)?.shortMessage} {(liquidateError as BaseError)?.metaMessages?.[0] && `- ${(liquidateError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {approveReceiptError && (
                                    <li>
                                        Approve Receipt Error: {(approveReceiptError as BaseError)?.shortMessage} {(approveReceiptError as BaseError)?.metaMessages?.[0] && `- ${(approveReceiptError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {liquidateReceiptError && (
                                    <li>
                                        Deposit Receipt Error: {(liquidateReceiptError as BaseError)?.shortMessage} {(liquidateReceiptError as BaseError)?.metaMessages?.[0] && `- ${(liquidateReceiptError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    {isLoadingJatCoinAddress && <p className="mt-2 text-xs text-muted-foreground">Loading JatStableCoin address...</p>}
                    {isErrorJatCoinAddress && (
                        <p className="mt-2 text-xs text-destructive">
                            Error loading JatStableCoin address: {(errorJatCoinAddress as Error).message}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default LiquidateUser;
