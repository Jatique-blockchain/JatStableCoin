// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { calculateFontSize } from "@/lib/calculateFontsize";
// import { middleEllipsis } from "@/lib/format-address";
// import { formatToDollars } from "@/lib/formatToDollars";
// import { format, formatDistanceToNow } from 'date-fns';
// import { TransactionHistoryEventArgs, TransactionType } from "./transactionTypes";

// export const TransactionCard = ({ event }: { event: TransactionHistoryEventArgs }) => {
//     const { transactionType, data, timestamp } = event;
//     const date = new Date(Number(timestamp) * 1000);

//     const formatValue = (value: bigint | undefined, type: TransactionType) => {
//         if (value === undefined) return '-';
//         const numberValue = Number(value) / 1e18; // Assuming 18 decimal places
//         return (type === TransactionType.BorrowedJatCoin || type === TransactionType.JatCoinRepaid)
//             ? formatToDollars(numberValue)
//             : numberValue.toFixed(2);
//     };
//     console.log("this is the transaction type", transactionType);
//     return (
//         <Card>
//             <CardHeader>

//                 <CardDescription>{TransactionType[transactionType]}</CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-2">
//                 {data.borrowId !== undefined && (
//                     <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">Borrow ID</span>
//                         <span style={{ fontSize: `${calculateFontSize(data.borrowId.toString())}px` }}>
//                             {data.borrowId.toString()}
//                         </span>
//                     </div>
//                 )}
//                 {data.amount !== undefined && (
//                     <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">Amount</span>
//                         <span>{formatValue(data.amount, transactionType)}</span>
//                     </div>
//                 )}
//                 {data.collateralAddress && (
//                     <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">Collateral Address</span>
//                         <span>{middleEllipsis(data.collateralAddress, 6)}</span>
//                     </div>
//                 )}
//                 {data.collateralSeized && (
//                     <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">Collateral Seized</span>
//                         <span>{data.collateralSeized ? 'Yes' : 'No'}</span>
//                     </div>
//                 )}
//                 {data.liquidator && (
//                     <div className="flex items-center justify-between">
//                         <span className="text-muted-foreground">Liquidator Address</span>
//                         <span>{middleEllipsis(data.liquidator, 6)}</span>
//                     </div>
//                 )}
//                 <div className="flex items-center justify-between">
//                     <span className="text-muted-foreground">Timestamp</span>
//                     <div className="flex items-center justify-center flex-col">
//                         <span >
//                             {format(date, 'yyyy-MM-dd HH:mm:ss')}
//                         </span>
//                         <span className="text-muted-foreground text-xs">
//                             {`(${formatDistanceToNow(date, { addSuffix: true })})`}
//                         </span>
//                     </div>

//                 </div>
//             </CardContent>
//         </Card>
//     );
// };

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { calculateFontSize } from "@/lib/calculateFontsize";
import { middleEllipsis } from "@/lib/format-address";
import { formatToDollars } from "@/lib/formatToDollars";
import { format, formatDistanceToNow } from 'date-fns';
import { TransactionHistoryEventArgs, TransactionType } from "./transactionTypes";
import { isAddressEqual, zeroAddress } from 'viem';

export const TransactionCard = ({ event }: { event: TransactionHistoryEventArgs }) => {
    const { transactionType, data, timestamp } = event;
    const date = new Date(Number(timestamp) * 1000);

    const formatValue = (value: bigint | undefined, type: TransactionType) => {
        if (value === undefined) return '-';
        const numberValue = Number(value) / 1e18; // Assuming 18 decimal places
        return (type === TransactionType.BorrowedJatCoin || type === TransactionType.JatCoinRepaid || type === TransactionType.Liquidation)
            ? formatToDollars(numberValue)
            : numberValue.toFixed(2);
    };

    const isNonZeroAddress = (address: `0x${string}` | undefined) => {
        return address !== undefined && !isAddressEqual(address, zeroAddress);
    };

    return (
        <Card className="bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 border border-border">
            <CardHeader className="border-b border-border pb-4">
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-center">
                    {TransactionType[transactionType]}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 px-4 sm:px-6">
                <div className="space-y-4">
                    {data.borrowId && (
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Borrow ID</span>
                            <span className="text-xs sm:text-sm md:text-base font-medium" style={{ fontSize: `${calculateFontSize(data.borrowId.toString())}px` }}>
                                {data.borrowId.toString()}
                            </span>
                        </div>
                    )}
                    {data.amount !== undefined && (
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Amount</span>
                            <span className="text-xs sm:text-sm md:text-base font-bold text-accent">
                                {formatValue(data.amount, transactionType)}
                            </span>
                        </div>
                    )}
                    {isNonZeroAddress(data.collateralAddress) && (
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Collateral Address</span>
                            <span className="text-xs sm:text-sm md:text-base font-medium">
                                {data.collateralAddress ? middleEllipsis(data.collateralAddress, 6) : ''}
                            </span>
                        </div>
                    )}
                    {data.collateralSeized && (
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Collateral Seized</span>
                            <span className="text-xs sm:text-sm md:text-base font-medium">
                                {data.collateralSeized ? 'Yes' : ''}
                            </span>
                        </div>
                    )}
                    {isNonZeroAddress(data.liquidator) && (
                        <div className="flex items-center justify-between border-b border-border pb-2">
                            <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Liquidator Address</span>
                            <span className="text-xs sm:text-sm md:text-base font-medium">
                                {data.liquidator ? middleEllipsis(data.liquidator, 6) : ''}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs sm:text-sm md:text-base text-muted-foreground">Timestamp</span>
                        <div className="text-right">
                            <span className="text-xs sm:text-sm md:text-base font-medium block">
                                {format(date, 'yyyy-MM-dd HH:mm:ss')}
                            </span>
                            <span className="text-xs sm:text-sm text-muted-foreground block">
                                {`(${formatDistanceToNow(date, { addSuffix: true })})`}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
