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

const MintTokens: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    console.log('MintTokens component rendered');

    const { address: userAddress } = useAccount();
    console.log('User address:', userAddress);

    const [wethAddress, setWethAddress] = useState<string>('');
    const [wbtcAddress, setWbtcAddress] = useState<string>('');
    const [mintAmount, setMintAmount] = useState<string>('1000');
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH');

    console.log('Initial state:', { wethAddress, wbtcAddress, mintAmount, selectedToken });

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
        data: hash,
        error,
        isPending: isPendingWriteContract,
        writeContractAsync
    } = useWriteContract();

    console.log('useWriteContract result:', { hash, error, isPendingWriteContract });

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    console.log('Transaction status:', { isConfirming, isConfirmed });

    async function submit(e: FormEvent<HTMLFormElement>) {
        console.log('Form submitted');
        e.preventDefault();
        const tokenAddress = selectedToken === 'WETH' ? wethAddress : wbtcAddress;
        const decimals = selectedToken === 'WETH' ? 18 : 8;
        const formattedAmount = parseUnits(mintAmount, decimals);

        console.log('Minting details:', { selectedToken, tokenAddress, decimals, mintAmount, formattedAmount });

        try {
            await writeContractAsync({
                address: tokenAddress as `0x${string}`,
                abi: erc20Abi,
                functionName: 'mint',
                args: [userAddress, formattedAmount],
            }, {
                onSuccess(data, variables, context) {
                    console.log('Minting successful:', data);
                    toast.success('Tokens minted successfully!');
                    onClose();
                },
                onError(error, variables, context) {
                    console.error('Minting error:', error);
                    toast.error('Failed to mint tokens. Please try again.');
                },
            });
        } catch (error) {
            console.error('Error calling writeContractAsync:', error);
            toast.error('An unexpected error occurred. Please try again.');
        }
        console.log('writeContract called');
    }

    return (
        <div className="p-4 bg-card text-card-foreground rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Mint Tokens</h3>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
                    <Input
                        id="amount"
                        type="number"
                        value={mintAmount}
                        onChange={(e) => {
                            console.log('Amount changed:', e.target.value);
                            setMintAmount(e.target.value);
                        }}
                        className="w-full"
                        placeholder="Enter amount to mint"
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
            {error && (
                <p className="mt-2 text-destructive text-sm">Error: {error.message}</p>
            )}
        </div>
    );
};

export default MintTokens;
