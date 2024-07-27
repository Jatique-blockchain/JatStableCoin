// useCollateralDepositedEvents.ts
import { useState, useEffect } from 'react';
import { useWatchContractEvent, usePublicClient, useAccount } from 'wagmi';
import { parseAbiItem, Address, Abi, decodeEventLog, DecodeEventLogReturnType } from 'viem';
import jatEngineAbi from "../abis/jatEngine.json";

export interface CollateralDepositedEventArgs {
    user: Address;
    collateralAddress: Address;
    amount: bigint;
    timestamp: bigint;
}

interface UseCollateralDepositedEventsResult {
    events: CollateralDepositedEventArgs[];
    isLoading: boolean;
    error: Error | null;
}

export const useCollateralDepositedEvents = (contractAddress: Address): UseCollateralDepositedEventsResult => {
    const { address: userAddress } = useAccount();
    const [events, setEvents] = useState<CollateralDepositedEventArgs[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const publicClient = usePublicClient();

    useWatchContractEvent({
        address: contractAddress,
        abi: jatEngineAbi as Abi,
        eventName: 'CollateralDeposited',
        onLogs: (logs) => {
            try {
                const decodedLogs = logs
                    .map(log => {
                        const decoded = decodeEventLog({
                            abi: jatEngineAbi as Abi,
                            data: log.data,
                            topics: log.topics,
                        }) as DecodeEventLogReturnType<typeof jatEngineAbi, 'CollateralDeposited'>;
                        return decoded.args as unknown as CollateralDepositedEventArgs;
                    })
                    .filter(event => event.user.toLowerCase() === userAddress?.toLowerCase());
                setEvents((prevEvents) => [...prevEvents, ...decodedLogs].sort((a, b) => Number(b.timestamp) - Number(a.timestamp)));
            } catch (err) {
                console.error('Error processing new events:', err);
                setError(err instanceof Error ? err : new Error('Unknown error processing new events'));
            }
        },
    });

    useEffect(() => {
        const fetchPreviousEvents = async () => {
            if (!publicClient) {
                setError(new Error('Public client not available'));
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const logs = await publicClient.getLogs({
                    address: contractAddress,
                    event: parseAbiItem('event CollateralDeposited(address indexed user, address collateralAddress, uint256 amount, uint256 timestamp)'),
                    args: {
                        user: userAddress
                    },
                    fromBlock: 'earliest',
                    toBlock: 'latest',
                });

                const decodedLogs = logs.map(log => {
                    const decoded = decodeEventLog({
                        abi: jatEngineAbi as Abi,
                        data: log.data,
                        topics: log.topics,
                    }) as DecodeEventLogReturnType<typeof jatEngineAbi, 'CollateralDeposited'>;
                    return decoded.args as unknown as CollateralDepositedEventArgs;
                });
                setEvents(decodedLogs.sort((a, b) => Number(b.timestamp) - Number(a.timestamp)));
            } catch (err) {
                console.error('Error fetching previous events:', err);
                setError(err instanceof Error ? err : new Error('Unknown error fetching previous events'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchPreviousEvents();
    }, [contractAddress, publicClient, userAddress]);

    return { events, isLoading, error };
};
