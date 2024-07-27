import { useInfiniteQuery } from '@tanstack/react-query';
import { usePublicClient, useAccount } from 'wagmi';
import { Address, Abi, decodeEventLog, DecodeEventLogReturnType, AbiEvent } from 'viem';
import jatEngineAbi from "../abis/jatEngine.json";
import { format, formatDistanceToNow } from 'date-fns';
import { TransactionHistoryEventArgs } from '@/components/transactionTypes';

// ... (keep the existing interfaces and enums)

const EVENTS_PER_FETCH = 5;

const transactionHistoryEvent = (jatEngineAbi as Abi).find(
    (item): item is AbiEvent => item.type === 'event' && item.name === 'TransactionHistory'
);

if (!transactionHistoryEvent) {
    throw new Error('TransactionHistory event not found in ABI');
}

export const useTransactionHistoryEvents = (contractAddress: Address) => {
    const { address: userAddress } = useAccount();
    const publicClient = usePublicClient();

    return useInfiniteQuery({
        queryKey: ['transactionHistory', contractAddress, userAddress],
        queryFn: async ({ pageParam = null }) => {
            if (!publicClient) {
                throw new Error('Public client not available');
            }
            const latestBlock = await publicClient.getBlockNumber();
            const fromBlock = pageParam ? pageParam : latestBlock;
            const toBlock = fromBlock > BigInt(EVENTS_PER_FETCH)
                ? fromBlock - BigInt(EVENTS_PER_FETCH)
                : BigInt(0);

            const logs = await publicClient.getLogs({
                address: contractAddress,
                event: transactionHistoryEvent,
                args: {
                    user: userAddress
                },
                fromBlock: toBlock,
                toBlock: fromBlock,
            });
            const events = logs.map(log => {
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

            return {
                events,
                nextCursor: toBlock > 0 ? toBlock - BigInt(1) : null,
            };
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: null as bigint | null,
    });
};
