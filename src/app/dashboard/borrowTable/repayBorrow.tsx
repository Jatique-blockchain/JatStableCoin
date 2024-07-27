import React, { useState, useEffect, FormEvent } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount, BaseError } from 'wagmi';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import jatEngineAbi from "../../../../abis/jatEngine.json";
import erc20Abi from "../../../../abis/erc20Mock.json"; // Assuming this is the correct path
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { formatUnits, parseUnits } from 'viem';
import { middleEllipsis } from '@/lib/format-address';
import { BorrowDetailsWithInterest } from './types';
import { isBigInt } from '../card-3';
import { useDebounce } from '@uidotdev/usehooks'; // Import the useDebounce hook

interface RepayBorrowProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    borrowDetails: BorrowDetailsWithInterest | null;
    collateralAddress: string;
}

const RepayBorrow: React.FC<RepayBorrowProps> = ({ open, onOpenChange, borrowDetails, collateralAddress }) => {
    const queryClient = useQueryClient();
    const [repayAmount, setRepayAmount] = useState<string>('1000');
    const [showReceipt, setShowReceipt] = useState<boolean>(false);
    const [isApproved, setIsApproved] = useState<boolean>(false);
    const [isApproving, setIsApproving] = useState<boolean>(false);
    const { address: userAddress } = useAccount();

    const debouncedRepayAmount = useDebounce(parseUnits(repayAmount, 18), 1000);

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
        data: repayHash,
        error: repayError,
        isPending: isRepayPending,
        writeContractAsync: repayAsync
    } = useWriteContract();

    const {
        isLoading: isApproveConfirming,
        isSuccess: isApproveConfirmed,
        error: approveReceiptError
    } = useWaitForTransactionReceipt({
        hash: approveHash,
    });

    const {
        isLoading: isRepayConfirming,
        data: receipt,
        isSuccess: isRepayConfirmed,
        error: repayReceiptError
    } = useWaitForTransactionReceipt({
        hash: repayHash,
    });

    useEffect(() => {
        if (isApproveConfirmed) {
            setIsApproved(true);
            setIsApproving(false);
            toast.success('Token spend approved successfully!');
        }
    }, [isApproveConfirmed]);

    useEffect(() => {
        if (isRepayConfirming && !isRepayPending) {
            setShowReceipt(true);
        }
        if (isRepayConfirmed) {
            setTimeout(() => {
                setShowReceipt(false);
                onOpenChange(false);
            }, 9000);
        }
    }, [isRepayConfirming, isRepayPending, isRepayConfirmed, onOpenChange]);

    const handleApprove = async () => {
        if (!borrowDetails || !jatCoinAddress) return;

        try {
            setIsApproving(true);
            await approveAsync({
                address: jatCoinAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'approve',
                args: [JATENGINE_CONTRACT_ADDRESS, debouncedRepayAmount],
            });
        } catch (error) {
            console.error('Error in approval process:', error);
            toast.error('An error occurred during the approval. Please try again.');
            setIsApproving(false);
        }
    };

    const handleRepay = async () => {
        if (!borrowDetails) return;
        const formattedAmount = parseUnits(repayAmount, 18);
        if (!(borrowDetails.borrowDetails.id)) {
            toast.error('Please select a borrow id to repay');
            return;
        }
        const id = isBigInt(borrowDetails.borrowDetails.id) ? formatUnits(borrowDetails.borrowDetails.id, 0) : "N/A";
        if (id === "N/A") {
            toast.error('id is not a valid number');
            return;
        }
        try {
            console.log("this is the id of the repayment on the contract", { id });
            console.log("this is the formatted amount", { formattedAmount });
            await repayAsync({
                address: JATENGINE_CONTRACT_ADDRESS,
                abi: jatEngineAbi,
                functionName: 'repayJatCoin',
                args: [parseUnits(id, 0), debouncedRepayAmount],
            });

            toast.success('Repayment successful!');
            queryClient.invalidateQueries();
        } catch (error) {
            console.error('Error in repayment process:', error);
            toast.error('Failed to repay. Please try again.');
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    console.log("this is any possible errors inside an objects that is all of the above", { approveError, repayError, approveReceiptError, repayReceiptError });
    const isTransactionInProgress = isApprovePending || isApproveConfirming || isRepayPending || isRepayConfirming || isApproving;
    const isDebouncing = debouncedRepayAmount !== parseUnits(repayAmount, 18);

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
            {showReceipt || isRepayConfirmed ? (
                <>
                    {showReceipt && (
                        <div className="flex flex-col items-center justify-center">
                            <div className="p-4 rounded-lg w-full max-w-md flex items-center justify-center">
                                <FaSpinner className="mr-2 h-4 w-4 animate-spin" />
                                <span>Awaiting the transaction receipt... Please wait...</span>
                            </div>
                        </div>
                    )}
                    {isRepayConfirmed && renderReceipt(receipt)}
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mb-4 text-center">Repay Borrow</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
                            <Input
                                id="amount"
                                type="number"
                                value={repayAmount}
                                onChange={(e) => setRepayAmount(e.target.value)}
                                className="w-full"
                                placeholder="Enter amount to repay"
                            />
                        </div>
                        <Button
                            type="button"
                            className="w-full mt-4"
                            onClick={isApproved ? handleRepay : handleApprove}
                            disabled={isTransactionInProgress || debouncedRepayAmount === BigInt(0) || isDebouncing}
                        >
                            {isTransactionInProgress ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                isApproved ? 'Repay Borrow' : 'Approve Token Spend'
                            )}
                        </Button>
                        {isApprovePending && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Approving token spend...</p>
                        )}
                        {isApproveConfirming && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Waiting for approval confirmation...</p>
                        )}
                        {isRepayPending && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Processing repayment...</p>
                        )}
                        {isRepayConfirming && (
                            <p className="text-xs text-center text-muted-foreground mt-2">Waiting for repayment confirmation...</p>
                        )}
                    </form>
                    {(approveError || repayError || approveReceiptError || repayReceiptError) && (
                        <div className="mt-4 text-destructive text-xs">
                            <p>Error occurred:</p>
                            <ul className="list-disc list-inside">
                                {approveError && (
                                    <li>
                                        Approve Error: {(approveError as BaseError)?.shortMessage} {(approveError as BaseError)?.metaMessages?.[0] && `- ${(approveError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {repayError && (
                                    <li>
                                        Deposit Error: {(repayError as BaseError)?.shortMessage} {(repayError as BaseError)?.metaMessages?.[0] && `- ${(repayError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {approveReceiptError && (
                                    <li>
                                        Approve Receipt Error: {(approveReceiptError as BaseError)?.shortMessage} {(approveReceiptError as BaseError)?.metaMessages?.[0] && `- ${(approveReceiptError as BaseError)?.metaMessages?.[0]}`}
                                    </li>
                                )}
                                {repayReceiptError && (
                                    <li>
                                        Deposit Receipt Error: {(repayReceiptError as BaseError)?.shortMessage} {(repayReceiptError as BaseError)?.metaMessages?.[0] && `- ${(repayReceiptError as BaseError)?.metaMessages?.[0]}`}
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

export default RepayBorrow;
