import { useState } from 'react';
import { useQuery, useQueryClient, QueryFunctionContext } from '@tanstack/react-query';
import { parseAbiItem } from 'viem';
import abi from '../abis/jatEngine.json';
import client from '@/lib/client';

import { AbiEvent } from 'viem'; // Adjust the import path as necessary

// types.ts
export interface JatCoinMintedEventLog {
    borrower: string;
    borrowId: bigint;
    amount: bigint;
    collateralAddress: string;
    timestamp: bigint;
    blockNumber: bigint;
}

const JatCoinMintedEvent = abi.find((item) => item.name === 'JatCoinMinted');

if (!JatCoinMintedEvent) {
    throw new Error('JatCoinMinted event not found in ABI');
}

// Convert the ABI item to a string format
const JatCoinMintedEventString = `event ${JatCoinMintedEvent.name}(${JatCoinMintedEvent.inputs.map(input => `${input.type} ${input.name}`).join(', ')})`;

const parsedJatCoinMintedEvent = parseAbiItem(JatCoinMintedEventString) as AbiEvent;

const fetchEvents = async ({ queryKey }: QueryFunctionContext<readonly [string, number, string, `0x${string}`]>) => {
    const [_key, page, userAddress, contractAddress] = queryKey;
    console.log('Fetching events for page:', page, 'and user:', userAddress, 'on contract:', contractAddress);
    const blockNumber = await client.getBlockNumber();
    console.log('Current block number:', blockNumber);
    const logs = await client.getLogs({
        event: parsedJatCoinMintedEvent,
        fromBlock: blockNumber - BigInt(20 * page),
        toBlock: blockNumber - BigInt(20 * (page - 1)),
        args: { borrower: userAddress },
        address: contractAddress,
    });
    console.log('Fetched logs:', logs);
    return logs.map(log => {
        const args = log.args as unknown as JatCoinMintedEventLog; // Double type assertion
        return {
            borrower: args.borrower,
            borrowId: args.borrowId,
            amount: args.amount,
            collateralAddress: args.collateralAddress,
            timestamp: args.timestamp,
            blockNumber: log.blockNumber,
        };
    });
};

const useJatCoinMintedEvents = (userAddress: `0x${string}`, contractAddress: `0x${string}`) => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const {
        data,
        isFetching,
        isError,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['JatCoinMintedEvents', page, userAddress, contractAddress] as const,
        queryFn: fetchEvents,

    });

    const fetchNextPage = () => {
        console.log('Fetching next page');
        setPage((old) => {
            const newPage = old + 1;
            console.log('New page:', newPage);
            return newPage;
        });
    };

    const fetchPreviousPage = () => {
        console.log('Fetching previous page');
        setPage((old) => {
            const newPage = Math.max(old - 1, 1);
            console.log('New page:', newPage);
            return newPage;
        });
    };



    console.log('Current data:', data);
    console.log('Is fetching:', isFetching);
    console.log('Is placeholder data:', isPlaceholderData);
    console.log("this is the error that is logged ", { error });

    return {
        data,
        isFetching,
        isError,
        error,
        isPlaceholderData,
        fetchNextPage,
        fetchPreviousPage,
        page,
    };
};

export default useJatCoinMintedEvents;
