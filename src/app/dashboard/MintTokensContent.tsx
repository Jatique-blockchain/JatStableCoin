import React, { useState, useEffect, FormEvent } from 'react';
import { useAccount } from 'wagmi';
import { BaseError, parseUnits } from 'viem';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'sonner';
import jatEngineAbi from "../../../abis/jatEngine.json";
import erc20Abi from "../../../abis/erc20Mock.json";
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useQueryClient } from '@tanstack/react-query';
import { middleEllipsis } from '@/lib/format-address';

interface MintTokensContentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tokenToMint: "WETH" | "WBTC";
}

const MintTokensContent: React.FC<MintTokensContentProps> = ({ open, onOpenChange, tokenToMint }) => {
    const queryClient = useQueryClient();
    const { address: userAddress } = useAccount();

    const [wethAddress, setWethAddress] = useState<string>('');
    const [wbtcAddress, setWbtcAddress] = useState<string>('');
    const [mintAmount, setMintAmount] = useState<string>('1000');
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>(tokenToMint);
    const [showReceipt, setShowReceipt] = useState<boolean>(false);

    const { data: collateralAddresses, isError, isLoading, error: errorReadContract } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getCollateralAddresses',
    });
    console.log("this is the collateralAddresses", { collateralAddresses });

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
    //logging all of the errors 
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
        const formattedAmount = parseUnits(mintAmount, decimals);

        try {
            await writeContractAsync({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'mint',
                args: [userAddress, formattedAmount],
            }, {
                onSuccess(data) {
                    toast.success('Tokens minted successfully!');
                    queryClient.invalidateQueries();
                },
                onError(error) {
                    toast.error('Failed to mint tokens. Please try again.');
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
    console.log("this is the log of all of the errors", { writeContractError, waitForReceiptError });

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
                    <h3 className="text-lg font-semibold mb-4 text-center">Mint Tokens</h3>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
                            <Input
                                id="amount"
                                type="number"
                                value={mintAmount}
                                onChange={(e) => setMintAmount(e.target.value)}
                                className="w-full"
                                placeholder="Enter amount to mint"
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
                                    Minting...
                                </>
                            ) : (
                                'Mint Tokens'
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

export default MintTokensContent;
