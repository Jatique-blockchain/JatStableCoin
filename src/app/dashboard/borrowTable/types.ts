export interface BorrowDetails {
    id: number;
    user: `0x${string}`;
    collateralAddress: string;
    amountOfJatCoinBorrowed: bigint;
    borrowTime: bigint; // Changed to bigint
}

export interface BorrowDetailsWithInterest {
    borrowDetails: BorrowDetails;
    totalDebtWithInterest: bigint;
    accumulatedInterest: bigint;
}