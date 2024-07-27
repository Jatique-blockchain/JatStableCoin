// useTransactionHistoryEvents.ts
import { useState, useEffect, useCallback } from 'react';
import { useWatchContractEvent, usePublicClient, useAccount } from 'wagmi';
import { Address, Abi, decodeEventLog, DecodeEventLogReturnType, AbiEvent, Log } from 'viem';
import jatEngineAbi from "../abis/jatEngine.json";

// ... (keep the existing interfaces and enums)
export enum TransactionType {
    JatCoinMinted,
    CollateralDeposited,
    JatCoinRepaid,
    Liquidation
}

export interface TransactionData {
    borrowId?: bigint;
    amount?: bigint;
    collateralAddress?: Address;
    collateralSeized?: bigint;
    liquidator?: Address;
}

export interface TransactionHistoryEventArgs {
    user: Address;
    timestamp: bigint;
    data: TransactionData;
    transactionType: TransactionType;
}

interface UseTransactionHistoryEventsResult {
    events: TransactionHistoryEventArgs[];
    isLoading: boolean;
    error: Error | null;
}

interface UseTransactionHistoryEventsResult {
    events: TransactionHistoryEventArgs[];
    isLoading: boolean;
    error: Error | null;
    fetchOlderEvents: () => Promise<void>;
    hasMoreEvents: boolean;
}

const EVENTS_PER_FETCH = 20;

const transactionHistoryEvent = (jatEngineAbi as Abi).find(
    (item): item is AbiEvent => item.type === 'event' && item.name === 'TransactionHistory'
);

if (!transactionHistoryEvent) {
    throw new Error('TransactionHistory event not found in ABI');
}

export const useTransactionHistoryEvents = (contractAddress: Address): UseTransactionHistoryEventsResult => {
    const { address: userAddress } = useAccount();
    const [events, setEvents] = useState<TransactionHistoryEventArgs[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [hasMoreEvents, setHasMoreEvents] = useState<boolean>(true);
    const [oldestFetchedBlock, setOldestFetchedBlock] = useState<bigint | null>(null);
    const publicClient = usePublicClient();

    const fetchEvents = useCallback(async (fromBlock: bigint, toBlock: bigint | 'latest') => {
        if (!publicClient) {
            throw new Error('Public client not available');
        }

        const logs = await publicClient.getLogs({
            address: contractAddress,
            event: transactionHistoryEvent,
            args: {
                user: userAddress
            },
            fromBlock,
            toBlock,
        });

        return logs.map(log => {
            const decoded = decodeEventLog({
                abi: jatEngineAbi as Abi,
                data: log.data,
                topics: log.topics,
            }) as DecodeEventLogReturnType<typeof jatEngineAbi, 'TransactionHistory'>;
            return {
                ...decoded.args as unknown as TransactionHistoryEventArgs,
                blockNumber: log.blockNumber
            };
        });
    }, [publicClient, contractAddress, userAddress]);

    const fetchOlderEvents = useCallback(async () => {
        if (isLoading || !hasMoreEvents) return;

        setIsLoading(true);
        setError(null);

        try {
            const latestBlock = await publicClient?.getBlockNumber();
            const fromBlock = oldestFetchedBlock ? oldestFetchedBlock - BigInt(1) : latestBlock;
            if (!fromBlock) return;
            const toBlock = fromBlock - BigInt(EVENTS_PER_FETCH);

            const newEvents = await fetchEvents(toBlock, fromBlock);

            if (newEvents.length > 0) {
                setEvents(prevEvents => [...prevEvents, ...newEvents]);
                setOldestFetchedBlock(toBlock);
            }

            setHasMoreEvents(newEvents.length === EVENTS_PER_FETCH);
        } catch (err) {
            console.error('Error fetching older events:', err);
            setError(err instanceof Error ? err : new Error('Unknown error fetching older events'));
        } finally {
            setIsLoading(false);
        }
    }, [fetchEvents, isLoading, hasMoreEvents, oldestFetchedBlock, publicClient]);

    useEffect(() => {
        fetchOlderEvents();
    }, [fetchOlderEvents]);

    useWatchContractEvent({
        address: contractAddress,
        abi: jatEngineAbi as Abi,
        eventName: 'TransactionHistory',
        onLogs: (logs) => {
            try {
                const decodedLogs = logs
                    .map(log => {
                        const decoded = decodeEventLog({
                            abi: jatEngineAbi as Abi,
                            data: log.data,
                            topics: log.topics,
                        }) as DecodeEventLogReturnType<typeof jatEngineAbi, 'TransactionHistory'>;
                        return {
                            ...decoded.args as unknown as TransactionHistoryEventArgs,
                            blockNumber: log.blockNumber
                        };
                    })
                    .filter(event => event.user.toLowerCase() === userAddress?.toLowerCase());
                setEvents((prevEvents) => [...decodedLogs, ...prevEvents].sort((a, b) => Number(b.timestamp) - Number(a.timestamp)));
            } catch (err) {
                console.error('Error processing new events:', err);
                setError(err instanceof Error ? err : new Error('Unknown error processing new events'));
            }
        },
    });

    return { events, isLoading, error, fetchOlderEvents, hasMoreEvents };
};
