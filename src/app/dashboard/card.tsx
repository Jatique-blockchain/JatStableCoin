//



// Cards.tsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "@/components/ui/credenza";
import { TotalBorrowedContent, TotalRepaidContent, TotalLiquidatedContent, HealthFactorContent, CollateralDepositContent } from './CredenzaContents';


export default function Cards() {
    const [selectedCoin, setSelectedCoin] = useState("total");
    const cards = [
        {
            title: "Total Borrowed",
            amount: "$1,234,567",
            trend: <TrendingUpIcon className="h-6 w-6 text-green-500" />,
            change: "+5.2% this month",
            buttonText: "View Borrowed",
            CredenzaContent: TotalBorrowedContent,
        },
        {
            title: "Total Repaid",
            amount: "$987,654",
            trend: <TrendingDownIcon className="h-6 w-6 text-red-500" />,
            change: "-2.1% this month",
            buttonText: "View Repaid",
            CredenzaContent: TotalRepaidContent,
        },
        {
            title: "Total Liquidated",
            amount: "$123,456",
            trend: <TrendingUpIcon className="h-6 w-6 text-yellow-500" />,
            change: "+8.3% this month",
            buttonText: "View Liquidated",
            CredenzaContent: TotalLiquidatedContent,
        },
    ];

    const collateral = [
        { type: "WETH", amount: "10 WETH", trend: <TrendingUpIcon className="h-5 w-5 text-green-500" /> },
        { type: "WBTC", amount: "5 WBTC", trend: <TrendingDownIcon className="h-5 w-5 text-red-500" /> },
    ];

    return (
        <div className='space-y-4'>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="dark:bg-background dark:border-neutral-800">
                    <CardHeader>
                        <CardTitle>Health Factor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-4xl font-bold">1.5</div>
                            <TrendingUpIcon className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground dark:text-muted-foreground">+0.2 this month</div>
                    </CardContent>
                    <CardFooter>
                        <Credenza>
                            <CredenzaTrigger asChild>
                                <Button variant="outline">View Health Factor</Button>
                            </CredenzaTrigger>
                            <CredenzaContent>
                                <CredenzaHeader>
                                    <CredenzaTitle>Health Factor</CredenzaTitle>
                                    <CredenzaDescription>Detailed information about your health factor</CredenzaDescription>
                                </CredenzaHeader>
                                <HealthFactorContent />
                            </CredenzaContent>
                        </Credenza>
                    </CardFooter>
                </Card>
                <Card className="dark:bg-background dark:border-neutral-800">
                    <CardHeader>
                        <CardTitle>Collateral Deposit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {collateral.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="text-2xl font-bold">{item.amount}</div>
                                        {item.trend}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select coin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="total">Total</SelectItem>
                                        <SelectItem value="weth">WETH</SelectItem>
                                        <SelectItem value="wbtc">WBTC</SelectItem>
                                        <SelectItem value="link">LINK</SelectItem>
                                        <SelectItem value="dai">DAI</SelectItem>
                                    </SelectContent>
                                </Select>
                                {selectedCoin === "total" && <div className="text-2xl font-bold">$50,000</div>}
                                {selectedCoin === "weth" && <div className="text-2xl font-bold">$30,000</div>}
                                {selectedCoin === "wbtc" && <div className="text-2xl font-bold">$20,000</div>}
                                {selectedCoin === "link" && <div className="text-2xl font-bold">$10,000</div>}
                                {selectedCoin === "dai" && <div className="text-2xl font-bold">$5,000</div>}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Credenza>
                            <CredenzaTrigger asChild>
                                <Button variant="outline" className='rounded-sm'>View Collateral</Button>
                            </CredenzaTrigger>
                            <CredenzaContent>
                                <CredenzaHeader>
                                    <CredenzaTitle>Collateral Deposit</CredenzaTitle>
                                    <CredenzaDescription>Detailed information about your collateral deposits</CredenzaDescription>
                                </CredenzaHeader>
                                <CollateralDepositContent />
                            </CredenzaContent>
                        </Credenza>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card, index) => (
                    <Card key={index} className="dark:bg-background dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-4xl font-bold">{card.amount}</div>
                                {card.trend}
                            </div>
                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">{card.change}</div>
                        </CardContent>
                        <CardFooter>
                            <Credenza>

                                <CredenzaTrigger asChild>
                                    <Button variant="outline" className='rounded-sm'>{card.buttonText}</Button>
                                </CredenzaTrigger>
                                <CredenzaContent>

                                    {card.CredenzaContent()}
                                </CredenzaContent>
                            </Credenza>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
