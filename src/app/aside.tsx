"use client";

import { FormEvent, useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, BaseError, Abi } from 'viem';
import jatEngineAbi from "../../abis/jatEngine.json";
import erc20Abi from "../../abis/erc20Mock.json";
import { Input } from '@/components/ui/input';

const jatEngineAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as `0x${string}`;

console.log('jatEngineAddress:', jatEngineAddress);

type GetCollateralAddressReturnType = [string, string];

export function MintMocks() {
    console.log('MintMocks component rendered');

    const { address: userAddress } = useAccount();
    console.log('User address:', userAddress);

    const [wethAddress, setWethAddress] = useState<string>('');
    const [wbtcAddress, setWbtcAddress] = useState<string>('');
    const [mintAmount, setMintAmount] = useState<string>('1000');
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>('WETH');



    console.log('Initial state:', { wethAddress, wbtcAddress, mintAmount, selectedToken });

    const { data: collateralAddresses, isError, isLoading, error: errorReadContract } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getCollateralAddresses',
    });
    console.log('useReadContract result:', { collateralAddresses, isError, isLoading, errorReadContract });

    useEffect(() => {
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

    const { isLoading: isConfirming, isSuccess: isConfirmed, isPending: isConfirmingPending } =
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

        writeContractAsync({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi as Abi,
            functionName: 'mint',
            args: [userAddress, formattedAmount],
        }, {
            onSuccess(data, variables, context) {

            },
            onError(error, variables, context) {
                console.log('Error:', error);
            },

        });
        console.log('writeContract called');
    }



    console.log('Rendering form');
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="container mx-auto p-4 max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Mint WETH and WBTC Mocks</h2>
                <form className="space-y-4" onSubmit={submit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Amount to Mint</label>
                        <Input
                            type="text"
                            value={mintAmount}
                            onChange={(e) => {
                                console.log('Mint amount changed:', e.target.value);
                                setMintAmount(e.target.value);
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="1000"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Token</label>
                        <select
                            value={selectedToken}
                            onChange={(e) => {
                                console.log('Selected token changed:', e.target.value);
                                setSelectedToken(e.target.value as 'WETH' | 'WBTC');
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        >
                            <option value="WETH">WETH</option>
                            <option value="WBTC">WBTC</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isPendingWriteContract || isConfirmingPending}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isPendingWriteContract || isConfirmingPending ? 'Minting...' : `Mint ${selectedToken}`}
                    </button>
                </form>
                {hash && <div className="mt-4">Transaction Hash: {hash}</div>}
                {isConfirming && <div className="mt-4">Waiting for confirmation...</div>}
                {isConfirmed && <div className="mt-4">Transaction confirmed.</div>}
                {error && (
                    <div className='flex flex-col justify-center items-center'>
                        <div className="mt-4 text-red-500">
                            Error: {(error as BaseError).shortMessage || error.message}
                        </div>
                        <div>
                            Error: {(error as BaseError).metaMessages?.[0] ?? error.message}
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <p>WETH Contract Address: {wethAddress}</p>
                    <p>WBTC Contract Address: {wbtcAddress}</p>
                </div>
            </div>
        </div>

    );
}

console.log('MintMocks component defined');

export default MintMocks;
