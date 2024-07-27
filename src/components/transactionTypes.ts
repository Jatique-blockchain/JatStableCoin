import { Address } from "viem";

export enum TransactionType {
    BorrowedJatCoin,
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

export interface UseTransactionHistoryEventsResult {
    events: TransactionHistoryEventArgs[];
    isLoading: boolean;
    error: Error | null;
}

export interface UseTransactionHistoryEventsResult {
    events: TransactionHistoryEventArgs[];
    isLoading: boolean;
    error: Error | null;
    fetchOlderEvents: () => Promise<void>;
    hasMoreEvents: boolean;
}
