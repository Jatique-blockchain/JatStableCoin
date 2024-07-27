
// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from '@/components/ui/button';
// import { useReadContract, useAccount } from 'wagmi';
// import jatEngineAbi from "../../../abis/jatEngine.json";
// import erc20Abi from "../../../abis/erc20Mock.json";
// import { Credenza, CredenzaTrigger, CredenzaContent } from '@/components/ui/credenza';
// import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
// import { formatUnits } from 'viem';
// import HealthFactorContent from './HealthFactorContent';
// import TotalBorrowedContent from './TotalBorrowedContent';
// import TotalRepaidContent from './TotalRepaidContent';
// import TotalLiquidatedContent from './TotalLiquidatedContent';
// import MintTokensContent from './MintTokensContent';
// import { CardSkeleton, CardSkeletonWithSelect } from './skeleton';
// import CollateralDepositContent from './CollateralDepositContent-2';
// import { Switch } from "@/components/ui/switch";

// const jatEngineAddress = JATENGINE_CONTRACT_ADDRESS as `0x${string}`;

// const calculateFontSize = (value: string | number): number => {
//     const length = value.toString().length;
//     return Math.max(16, 48 - length * 7);
// };

// interface CardData {
//     title: string;
//     amount: string | number;
//     trend: JSX.Element;
//     change: string;
//     buttonText: string;
//     CredenzaContent: React.ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void }>;
// }

// export default function Cards() {
//     const { address: userAddress } = useAccount();
//     const [selectedCoin, setSelectedCoin] = useState("total");
//     const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>("WETH");
//     const [openCredenza, setOpenCredenza] = useState<string | null>(null);
//     const [inDollar, setInDollar] = useState(false);

//     const { data: healthFactor, isLoading: isHealthFactorLoading } = useReadContract({
//         address: jatEngineAddress,
//         abi: jatEngineAbi,
//         functionName: 'getHealthFactor',
//         args: [userAddress],
//         scopeKey: `healthFactor-${userAddress}`,
//     });

//     const { data: totalCollateralValue, isLoading: isTotalCollateralLoading, error: totalCollateralValueError } = useReadContract({
//         address: jatEngineAddress,
//         abi: jatEngineAbi,
//         functionName: 'getTotalCollateralValueOfUser',
//         args: [userAddress, inDollar],
//         scopeKey: `totalCollateral-${userAddress}-${inDollar}`,
//     });
//     console.log("this is the totalCollateralValue", { totalCollateralValue });
//     console.log("this is the totalCollateralValue error", { totalCollateralValueError });

//     const { data: totalBorrowed, isLoading: isTotalBorrowedLoading } = useReadContract({
//         address: jatEngineAddress,
//         abi: jatEngineAbi,
//         functionName: 'getUserTotalJatCoinBorrowedWithInterest',
//         args: [userAddress],
//         scopeKey: `totalBorrowed-${userAddress}`,
//     });

//     const { data: tokenBalance, isLoading: isTokenBalanceLoading } = useReadContract({
//         address: jatEngineAddress,
//         abi: jatEngineAbi,
//         functionName: 'getERC20Balance',
//         args: [userAddress, selectedToken],
//         scopeKey: `tokenBalance-${userAddress}-${selectedToken}`,

//     });

//     const { data: specificCollateralDeposited, isLoading: isSpecificCollateralLoading } = useReadContract({
//         address: jatEngineAddress,
//         abi: jatEngineAbi,
//         functionName: 'getCollateralValueOfUserByType',
//         args: [userAddress, selectedCoin === 'weth' ? 'WETH' : 'WBTC', inDollar],
//         scopeKey: `specificCollateral-${userAddress}-${selectedCoin}-${inDollar}`,
//     });

//     const renderNumber = (value: string): string | number => {
//         const number = parseFloat(value);
//         if (isNaN(number)) {
//             return "N/A";
//         }
//         if (number > 4) {
//             return "> 4";
//         } else {
//             return number;
//         }
//     };

//     const isBigInt = (value: unknown): value is bigint => {
//         return typeof value === 'bigint';
//     };

//     const cards: CardData[] = [
//         {
//             title: "Total Borrowed",
//             amount: renderNumber(isBigInt(totalBorrowed) ? formatUnits(totalBorrowed, 1) : 'N/A'),
//             trend: <TrendingUpIcon className="h-6 w-6 text-green-500" />,
//             change: "+5.2% this month",
//             buttonText: "View Borrowed",
//             CredenzaContent: TotalBorrowedContent,
//         },
//         {
//             title: "Total Repaid",
//             amount: 1000,
//             trend: <TrendingDownIcon className="h-6 w-6 text-red-500" />,
//             change: "-2.1% this month",
//             buttonText: "View Repaid",
//             CredenzaContent: TotalRepaidContent,
//         },
//         {
//             title: "Total Liquidated",
//             amount: "$123,456",
//             trend: <TrendingUpIcon className="h-6 w-6 text-yellow-500" />,
//             change: "+8.3% this month",
//             buttonText: "View Liquidated",
//             CredenzaContent: TotalLiquidatedContent,
//         },
//     ];

//     return (
//         <div className='space-y-4'>
//             <div className="grid grid-cols-1 gap-4 sm:gridd-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
//                 {isHealthFactorLoading ? (
//                     <CardSkeleton />
//                 ) : (
//                     <Card className="dark:bg-background dark:border-neutral-800">
//                         <CardHeader>
//                             <CardTitle>Health Factor</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="flex items-center justify-between">
//                                 <div style={{ fontSize: `${calculateFontSize(renderNumber(isBigInt(healthFactor) ? formatUnits(healthFactor, 18) : 'N/A'))}px`, fontWeight: 'bold' }}>
//                                     {renderNumber(isBigInt(healthFactor) ? formatUnits(healthFactor, 18) : 'N/A')}
//                                 </div>
//                                 <TrendingUpIcon className="h-6 w-6 text-green-500" />
//                             </div>
//                             <div className="text-sm text-muted-foreground dark:text-muted-foreground">+0.2 this month</div>
//                         </CardContent>
//                         <CardFooter>
//                             <Credenza open={openCredenza === 'healthFactor'} onOpenChange={(open) => setOpenCredenza(open ? 'healthFactor' : null)}>
//                                 <CredenzaTrigger asChild>
//                                     <Button variant="outline">View Health Factor</Button>
//                                 </CredenzaTrigger>
//                                 <CredenzaContent>
//                                     <HealthFactorContent
//                                         open={openCredenza === 'healthFactor'}
//                                         onOpenChange={(open) => setOpenCredenza(open ? 'healthFactor' : null)}
//                                     />
//                                 </CredenzaContent>
//                             </Credenza>
//                         </CardFooter>
//                     </Card>
//                 )}

//                 {isSpecificCollateralLoading || isTotalCollateralLoading ? (
//                     <CardSkeletonWithSelect />
//                 ) : (
//                     <Card className="dark:bg-background dark:border-neutral-800">
//                         <CardHeader>
//                             <CardTitle>Collateral Deposit</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                     <Select value={selectedCoin} onValueChange={(value) => {
//                                         console.log("Select value changed:", value);
//                                         setSelectedCoin(value);
//                                     }}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select coin" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="total">Total</SelectItem>
//                                             <SelectItem value="weth">weth</SelectItem>
//                                             <SelectItem value="wbtc">wbtc</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                     <div style={{
//                                         fontSize: `${calculateFontSize(selectedCoin === "total"
//                                             ? isBigInt(totalCollateralValue)
//                                                 ? formatUnits(totalCollateralValue, 18)
//                                                 : 'N/A'
//                                             : isBigInt(specificCollateralDeposited)
//                                                 ? formatUnits(specificCollateralDeposited, 18)
//                                                 : 'N/A')}px`, fontWeight: 'bold'
//                                     }}>
//                                         {selectedCoin === "total"
//                                             ? isBigInt(totalCollateralValue)
//                                                 ? formatUnits(totalCollateralValue, 18)
//                                                 : 'N/A'
//                                             : isBigInt(specificCollateralDeposited)
//                                                 ? formatUnits(specificCollateralDeposited, 18)
//                                                 : 'N/A'}
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                     <Switch id="in-dollar" checked={inDollar} onCheckedChange={setInDollar} />
//                                     <label htmlFor="in-dollar">In Dollar</label>
//                                 </div>
//                             </div>
//                         </CardContent>
//                         <CardFooter>
//                             <Credenza open={openCredenza === 'collateralDeposit'} onOpenChange={(open) => setOpenCredenza(open ? 'collateralDeposit' : null)}>
//                                 <CredenzaTrigger asChild>
//                                     <Button variant="outline" className='rounded-sm'>Deposit Collateral</Button>
//                                 </CredenzaTrigger>
//                                 <CredenzaContent>
//                                     <CollateralDepositContent
//                                         open={openCredenza === 'collateralDeposit'}
//                                         onOpenChange={(open) => setOpenCredenza(open ? 'collateralDeposit' : null)} tokenToDeposit={selectedToken} />
//                                 </CredenzaContent>
//                             </Credenza>
//                         </CardFooter>
//                     </Card>
//                 )}

//                 {isTokenBalanceLoading ? (
//                     <CardSkeletonWithSelect />
//                 ) : (
//                     <Card className="dark:bg-background dark:border-neutral-800">
//                         <CardHeader>
//                             <CardTitle>Token Balances</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2">
//                                     <Select value={selectedToken} onValueChange={(value) => {
//                                         console.log("Select value changed:", value);
//                                         setSelectedToken(value as 'WETH' | 'WBTC');
//                                     }}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select token" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectItem value="WETH">weth</SelectItem>
//                                             <SelectItem value="WBTC">wbtc</SelectItem>
//                                         </SelectContent>
//                                     </Select>
//                                     <div style={{ fontSize: `${calculateFontSize(isBigInt(tokenBalance) ? formatUnits(tokenBalance, 18) : 'N/A')}px`, fontWeight: 'bold' }}>
//                                         {isBigInt(tokenBalance) ? formatUnits(tokenBalance, 18) : 'N/A'}
//                                     </div>
//                                 </div>
//                             </div>
//                         </CardContent>
//                         <CardFooter>
//                             <Credenza open={openCredenza === 'mintToken'} onOpenChange={(open) => setOpenCredenza(open ? 'mintToken' : null)}>
//                                 <CredenzaTrigger asChild>
//                                     <Button variant="outline" className='rounded-sm'>Mint Token</Button>
//                                 </CredenzaTrigger>
//                                 <CredenzaContent>
//                                     <MintTokensContent
//                                         open={openCredenza === 'mintToken'}
//                                         onOpenChange={(open) => setOpenCredenza(open ? 'mintToken' : null)} tokenToMint={selectedToken} />
//                                 </CredenzaContent>
//                             </Credenza>
//                         </CardFooter>
//                     </Card>
//                 )}
//             </div>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//                 {cards.map((card, index) => (
//                     isTotalBorrowedLoading ? (
//                         <CardSkeleton key={index} />
//                     ) : (
//                         <Card key={index} className="dark:bg-background dark:border-neutral-800">
//                             <CardHeader>
//                                 <CardTitle>{card.title}</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                                 <div className="flex items-center justify-between">
//                                     <div style={{ fontSize: `${calculateFontSize(card.amount)}px`, fontWeight: 'bold' }}>{String(card.amount)}</div>
//                                     {card.trend}
//                                 </div>
//                                 <div className="text-sm text-muted-foreground dark:text-muted-foreground">{card.change}</div>
//                             </CardContent>
//                             <CardFooter>
//                                 <Credenza open={openCredenza === `card-${index}`} onOpenChange={(open) => setOpenCredenza(open ? `card-${index}` : null)}>
//                                     <CredenzaTrigger asChild>
//                                         <Button variant="outline" className='rounded-sm' onClick={() => console.log(`${card.buttonText} button clicked`)}>{card.buttonText}</Button>
//                                     </CredenzaTrigger>
//                                     <CredenzaContent>
//                                         <card.CredenzaContent
//                                             open={openCredenza === `card-${index}`}
//                                             onOpenChange={(open) => setOpenCredenza(open ? `card-${index}` : null)}
//                                         />
//                                     </CredenzaContent>
//                                 </Credenza>
//                             </CardFooter>
//                         </Card>
//                     )
//                 ))}
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useReadContract, useAccount } from 'wagmi';
import jatEngineAbi from "../../../abis/jatEngine.json";
import erc20Abi from "../../../abis/erc20Mock.json";
import { Credenza, CredenzaTrigger, CredenzaContent } from '@/components/ui/credenza';
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { formatUnits } from 'viem';
import HealthFactorContent from './HealthFactorContent';
import TotalBorrowedContent from './TotalBorrowedContent';
import TotalRepaidContent from './TotalRepaidContent';
import TotalLiquidatedContent from './TotalLiquidatedContent';
import MintTokensContent from './MintTokensContent';
import { CardSkeleton, CardSkeletonWithSelect } from './skeleton';
import CollateralDepositContent from './CollateralDepositContent-2';
import { Switch } from "@/components/ui/switch";
import { formatToDollars } from '@/lib/formatToDollars';
import { calculateFontSize } from '@/lib/calculateFontsize';
import DepositAndBorrow from './DepositAndBorrow';
import BorrowJatCoinContent from './BorrowContent';

const jatEngineAddress = JATENGINE_CONTRACT_ADDRESS as `0x${string}`;



interface CardData {
    title: string;
    amount: string | number;
    trend: JSX.Element;
    change: string;
    buttonText: string;
    CredenzaContent: React.ComponentType<{ open: boolean; onOpenChange: (open: boolean) => void, tokenInvolved: 'WETH' | 'WBTC' }>;
}

export default function Cards() {
    const { address: userAddress } = useAccount();
    const [selectedCoin, setSelectedCoin] = useState("total");
    const [selectedToken, setSelectedToken] = useState<'WETH' | 'WBTC'>("WETH");
    const [openCredenza, setOpenCredenza] = useState<string | null>(null);
    const [inDollar, setInDollar] = useState(false);

    const { data: healthFactor, isLoading: isHealthFactorLoading } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getHealthFactor',
        args: [userAddress],
        scopeKey: `healthFactor-${userAddress}`,
    });

    const { data: totalCollateralValue, isLoading: isTotalCollateralLoading, error: totalCollateralValueError } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getTotalCollateralValueOfUser',
        args: [userAddress, inDollar],
        scopeKey: `totalCollateral-${userAddress}-${inDollar}`,
    });
    console.log("this is the totalCollateralValue", { totalCollateralValue });
    console.log("this is the totalCollateralValue error", { totalCollateralValueError });

    const { data: totalBorrowed, isLoading: isTotalBorrowedLoading } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getUserTotalJatCoinBorrowedWithInterest',
        args: [userAddress],
        scopeKey: `totalBorrowed-${userAddress}`,
    });

    const { data: tokenBalance, isLoading: isTokenBalanceLoading } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getERC20Balance',
        args: [userAddress, selectedToken],
        scopeKey: `tokenBalance-${userAddress}-${selectedToken}`,

    });

    const { data: specificCollateralDeposited, isLoading: isSpecificCollateralLoading } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getCollateralValueOfUserByType',
        args: [userAddress, selectedCoin === 'weth' ? 'WETH' : 'WBTC', inDollar],
        scopeKey: `specificCollateral-${userAddress}-${selectedCoin}-${inDollar}`,
    });

    const renderNumber = (value: string): string | number => {
        const number = parseFloat(value);
        if (isNaN(number)) {
            return "N/A";
        }
        if (number > 4) {
            return "> 4";
        } else {
            return number;
        }
    };

    const isBigInt = (value: unknown): value is bigint => {
        return typeof value === 'bigint';
    };

    const formatAmount = (amount: string | number): string | number => {
        if (inDollar) {
            try {
                return formatToDollars(amount);
            } catch (error) {
                console.log("this is the error ooo", error);
                return "N/A";
            }
        }
        return amount;
    };

    const cards: CardData[] = [
        {
            title: "Total Borrowed",
            amount: formatToDollars(isBigInt(totalBorrowed) ? formatUnits(totalBorrowed, 18) : 'N/A'),
            trend: <TrendingUpIcon className="h-6 w-6 text-green-500" />,
            change: "+5.2% this month",
            buttonText: "Borrow JatCoin",
            CredenzaContent: BorrowJatCoinContent,
        },
        {
            title: "Total Repaid",
            amount: formatAmount(1000),
            trend: <TrendingDownIcon className="h-6 w-6 text-red-500" />,
            change: "-2.1% this month",
            buttonText: "View Repaid",
            CredenzaContent: TotalRepaidContent,
        },
        {
            title: "Total Liquidated",
            amount: formatAmount("123456"),
            trend: <TrendingUpIcon className="h-6 w-6 text-yellow-500" />,
            change: "+8.3% this month",
            buttonText: "View Liquidated",
            CredenzaContent: TotalLiquidatedContent,
        },
    ];

    return (
        <div className='space-y-4'>
            <div className="grid grid-cols-1 gap-4 sm:gridd-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
                {isHealthFactorLoading ? (
                    <CardSkeleton />
                ) : (
                    <Card className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Health Factor</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div style={{ fontSize: `${calculateFontSize(renderNumber(isBigInt(healthFactor) ? formatUnits(healthFactor, 18) : 'N/A'))}px`, fontWeight: 'bold' }}>
                                    {renderNumber(isBigInt(healthFactor) ? formatUnits(healthFactor, 18) : 'N/A')}
                                </div>
                                <TrendingUpIcon className="h-6 w-6 text-green-500" />
                            </div>
                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">+0.2 this month</div>
                        </CardContent>
                        <CardFooter>
                            <Credenza open={openCredenza === 'healthFactor'} onOpenChange={(open) => setOpenCredenza(open ? 'healthFactor' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant="outline">View Health Factor</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <HealthFactorContent
                                        open={openCredenza === 'healthFactor'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'healthFactor' : null)}
                                    />
                                </CredenzaContent>
                            </Credenza>
                        </CardFooter>
                    </Card>
                )}

                {isSpecificCollateralLoading || isTotalCollateralLoading ? (
                    <CardSkeletonWithSelect />
                ) : (
                    <Card className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Collateral Deposit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Select value={selectedCoin} onValueChange={(value) => {
                                        console.log("Select value changed:", value);
                                        setSelectedCoin(value);
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select coin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="total">Total</SelectItem>
                                            <SelectItem value="weth">weth</SelectItem>
                                            <SelectItem value="wbtc">wbtc</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div style={{
                                        fontSize: `${calculateFontSize(selectedCoin === "total"
                                            ? formatAmount(isBigInt(totalCollateralValue)
                                                ? formatUnits(totalCollateralValue, 18)
                                                : 'N/A')
                                            : formatAmount(isBigInt(specificCollateralDeposited)
                                                ? formatUnits(specificCollateralDeposited, 18)
                                                : 'N/A'))}px`, fontWeight: 'bold'
                                    }}>
                                        {selectedCoin === "total"
                                            ? formatAmount(isBigInt(totalCollateralValue)
                                                ? formatUnits(totalCollateralValue, 18)
                                                : 'N/A')
                                            : formatAmount(isBigInt(specificCollateralDeposited)
                                                ? formatUnits(specificCollateralDeposited, 18)
                                                : 'N/A')}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch className='' id="in-dollar" checked={inDollar} onCheckedChange={setInDollar} />
                                    <label htmlFor="in-dollar">In Dollar</label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='justify-between flex items-center flex-row '>
                            <Credenza open={openCredenza === 'collateralDepositAndBorrow'} onOpenChange={(open) => setOpenCredenza(open ? 'collateralDepositAndBorrow' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant={"secondary"} className='rounded-sm bg-rose-500 text-sm'>Deposit And Borrow</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <DepositAndBorrow
                                        open={openCredenza === 'collateralDepositAndBorrow'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'collateralDepositAndBorrow' : null)} tokenToDeposit={selectedToken} />
                                </CredenzaContent>
                            </Credenza>
                            <Credenza open={openCredenza === 'collateralDeposit'} onOpenChange={(open) => setOpenCredenza(open ? 'collateralDeposit' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant="outline" className='rounded-sm'>Deposit</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <CollateralDepositContent
                                        open={openCredenza === 'collateralDeposit'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'collateralDeposit' : null)} tokenToDeposit={selectedToken} />
                                </CredenzaContent>
                            </Credenza>
                        </CardFooter>
                    </Card>
                )}

                {isTokenBalanceLoading ? (
                    <CardSkeletonWithSelect />
                ) : (
                    <Card className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Token Balances</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Select value={selectedToken} onValueChange={(value) => {
                                        console.log("Select value changed:", value);
                                        setSelectedToken(value as 'WETH' | 'WBTC');
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select token" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="WETH">weth</SelectItem>
                                            <SelectItem value="WBTC">wbtc</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div style={{ fontSize: `${calculateFontSize((isBigInt(tokenBalance) ? formatUnits(tokenBalance, 18) : 'N/A'))}px`, fontWeight: 'bold' }}>
                                        {isBigInt(tokenBalance) ? formatUnits(tokenBalance, 18) : 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Credenza open={openCredenza === 'mintToken'} onOpenChange={(open) => setOpenCredenza(open ? 'mintToken' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant="outline" className='rounded-sm'>Mint Token</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <MintTokensContent
                                        open={openCredenza === 'mintToken'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'mintToken' : null)} tokenToMint={selectedToken} />
                                </CredenzaContent>
                            </Credenza>
                        </CardFooter>
                    </Card>
                )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    isTotalBorrowedLoading ? (
                        <CardSkeleton key={index} />
                    ) : (
                        <Card key={index} className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div style={{ fontSize: `${calculateFontSize(card.amount)}px`, fontWeight: 'bold' }}>{String(card.amount)}</div>
                                    {card.trend}
                                </div>
                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">{card.change}</div>
                            </CardContent>
                            <CardFooter>
                                <Credenza open={openCredenza === `card-${index}`} onOpenChange={(open) => setOpenCredenza(open ? `card-${index}` : null)}>
                                    <CredenzaTrigger asChild>
                                        <Button variant="outline" className='rounded-sm' onClick={() => console.log(`${card.buttonText} button clicked`)}>{card.buttonText}</Button>
                                    </CredenzaTrigger>
                                    <CredenzaContent>
                                        <card.CredenzaContent
                                            open={openCredenza === `card-${index}`}
                                            onOpenChange={(open) => setOpenCredenza(open ? `card-${index}` : null)}
                                            tokenInvolved={selectedToken}
                                        />
                                    </CredenzaContent>
                                </Credenza>
                            </CardFooter>
                        </Card>
                    )
                ))}
            </div>
        </div>
    );
}

