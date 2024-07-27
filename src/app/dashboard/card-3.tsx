import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from '@/components/ui/button';
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
import Link from 'next/link';

export const isBigInt = (value: unknown): value is bigint => {
    return typeof value === 'bigint';
};
const jatEngineAddress = JATENGINE_CONTRACT_ADDRESS as `0x${string}`;

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
    const { data: accumulatedInterest, isLoading: isAccumulatedInterestLoading, error: accumulatedInterestError } = useReadContract({
        address: jatEngineAddress,
        abi: jatEngineAbi,
        functionName: 'getUserAccumulatedInterest',
        args: [userAddress],
        // scopeKey: `accumulatedInterest-${userAddress}`,
    });
    console.log("this is the accumulatedInterestError", { accumulatedInterestError });
    console.log("this is the accumulatedInterest", { accumulatedInterest });
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

    const renderNumber = (value: string): string => {
        const number = parseFloat(value);
        if (isNaN(number)) {
            return "N/A";
        }
        if (number > 4) {
            return "> 4";
        } else {
            return number.toFixed(2);
        }
    };

    const getCardColor = (healthFactor: number): string => {
        if (healthFactor < 1) {
            return "bg-red-500 animate-pulse  text-white ";
        } else if (healthFactor >= 1 && healthFactor <= 1.5) {
            return "text-yellow-500 ";
        } else {
            return "";
        }
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

    return (
        <div className='space-y-4'>
            <div className="grid grid-cols-1 gap-4  md:grid-cols-2 lg:grid-cols-3 ">
                {/* {isHealthFactorLoading ? (
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
                )} */}
                {isHealthFactorLoading ? (
                    <CardSkeleton />
                ) : (
                    <Card className={`dark:border-neutral-800 ${isBigInt(healthFactor) ? getCardColor(parseFloat(formatUnits(healthFactor, 18))) : ''} ${isBigInt(healthFactor) && parseFloat(formatUnits(healthFactor, 18)) < 1 ? 'animate-pulse' : ''}`}>
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
                            {isBigInt(healthFactor) && parseFloat(formatUnits(healthFactor, 18)) < 1 && (
                                <div className="mt-2 text-black font-semibold">
                                    Warning: Your position can be liquidated by anybody!
                                </div>
                            )}
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
                {isTotalBorrowedLoading || isAccumulatedInterestLoading ? (
                    <CardSkeleton />
                ) : (
                    <Card className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Total Borrowed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div style={{ fontSize: `${calculateFontSize(formatToDollars(isBigInt(totalBorrowed) ? formatUnits(totalBorrowed, 18) : 'N/A'))}px`, fontWeight: 'bold' }}>
                                    {formatToDollars(isBigInt(totalBorrowed) ? formatUnits(totalBorrowed, 18) : 'N/A')}
                                </div>
                                <TrendingUpIcon className="h-6 w-6 text-green-500" />
                            </div>
                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">+5.2% this month</div>
                            <div className="mt-2">
                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">Accumulated Interest:</div>
                                <div style={{ fontSize: `${calculateFontSize(formatToDollars(isBigInt(accumulatedInterest) ? formatUnits(accumulatedInterest, 18) : 'N/A'))}px`, fontWeight: 'bold' }}>
                                    {formatToDollars(isBigInt(accumulatedInterest) ? formatUnits(accumulatedInterest, 18) : 'N/A')}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className='justify-between flex items-center flex-row '>
                            <Credenza open={openCredenza === 'totalBorrowed'} onOpenChange={(open) => setOpenCredenza(open ? 'totalBorrowed' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant="outline" className='rounded-sm'>Borrow JatCoin</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <BorrowJatCoinContent
                                        open={openCredenza === 'totalBorrowed'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'totalBorrowed' : null)}
                                        tokenInvolved={selectedToken}
                                    />
                                </CredenzaContent>
                            </Credenza>
                            <Link href={"/dashboard/borrowTable"} className={`${buttonVariants({ variant: 'outline' })} bg-red-500 animate-pulse rounded-sm`}>View Borrow Details</Link>

                        </CardFooter>
                    </Card>
                )}


                {isTotalBorrowedLoading ? (
                    <CardSkeleton />
                ) : (
                    <Card className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Total Repaid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div style={{ fontSize: `${calculateFontSize(formatAmount(1000))}px`, fontWeight: 'bold' }}>
                                    {formatAmount(1000)}
                                </div>
                                <TrendingDownIcon className="h-6 w-6 text-red-500" />
                            </div>
                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">-2.1% this month</div>
                        </CardContent>
                        <CardFooter>
                            <Credenza open={openCredenza === 'totalRepaid'} onOpenChange={(open) => setOpenCredenza(open ? 'totalRepaid' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant="outline" className='rounded-sm'>View Repaid</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <TotalRepaidContent
                                        open={openCredenza === 'totalRepaid'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'totalRepaid' : null)}
                                        tokenInvolved={selectedToken}
                                    />
                                </CredenzaContent>
                            </Credenza>
                        </CardFooter>
                    </Card>
                )}

                {isTotalBorrowedLoading ? (
                    <CardSkeleton />
                ) : (
                    <Card className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Total Liquidated</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div style={{ fontSize: `${calculateFontSize(formatAmount("123456"))}px`, fontWeight: 'bold' }}>
                                    {formatAmount("123456")}
                                </div>
                                <TrendingUpIcon className="h-6 w-6 text-yellow-500" />
                            </div>
                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">+8.3% this month</div>
                        </CardContent>
                        <CardFooter>
                            <Credenza open={openCredenza === 'totalLiquidated'} onOpenChange={(open) => setOpenCredenza(open ? 'totalLiquidated' : null)}>
                                <CredenzaTrigger asChild>
                                    <Button variant="outline" className='rounded-sm'>View Liquidated</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>
                                    <TotalLiquidatedContent
                                        open={openCredenza === 'totalLiquidated'}
                                        onOpenChange={(open) => setOpenCredenza(open ? 'totalLiquidated' : null)}
                                        tokenInvolved={selectedToken}
                                    />
                                </CredenzaContent>
                            </Credenza>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    );
}

