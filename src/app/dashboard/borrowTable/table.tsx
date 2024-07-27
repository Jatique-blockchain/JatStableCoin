"use client";
import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Credenza, CredenzaTrigger, CredenzaContent } from '@/components/ui/credenza';
import { useReadContract } from 'wagmi';
import jatEngineAbi from "../../../../abis/jatEngine.json";
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useAccount } from 'wagmi';
import CustomMessageCard from '@/components/customMessage';
import { formatUnits } from 'viem';
import { middleEllipsis } from '@/lib/format-address';
import { formatToDollars } from '@/lib/formatToDollars';
import { BorrowDetailsWithInterest } from './types';
import { isBigInt } from '../card-3';
import { formatDistanceToNow } from 'date-fns';
import RepayBorrow from './repayBorrow';
import Loading from '@/components/loader';

const BorrowDetailsTable: React.FC = () => {
    const { address: userAddress } = useAccount();
    const [openCredenza, setOpenCredenza] = useState<string | null>(null);
    const [selectedBorrowDetails, setSelectedBorrowDetails] = useState<BorrowDetailsWithInterest | null>(null);

    const { data: borrowDetailsReturned, isLoading, error } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getUserAllBorrowDetails',
        args: [userAddress],
    });

    const borrowDetails = borrowDetailsReturned as BorrowDetailsWithInterest[];

    const handleCredenzaOpen = (borrowDetails: BorrowDetailsWithInterest) => {
        setSelectedBorrowDetails(borrowDetails);
        setOpenCredenza('repayBorrow');
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <Loading className='h-screen w-screen' />
            </div>
        );
    }

    if (error) {
        return <CustomMessageCard message="Error loading borrow details" />;
    }

    if (!borrowDetails || borrowDetails.length === 0) {
        return <CustomMessageCard message="No borrow details found" />;
    }

    return (
        <>
            <Card className="dark:bg-background dark:border-neutral-800 mb-4">
                <CardHeader>
                    <CardTitle>Borrow Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-1/4 md:w-1/6">Borrow ID</TableHead>
                                    <TableHead className="hidden md:table-cell w-1/6">Collateral Address</TableHead>
                                    <TableHead className="w-1/4 md:w-1/6">Amount Borrowed</TableHead>
                                    <TableHead className="w-1/2 md:w-1/6">Borrow Time</TableHead>
                                    <TableHead className="hidden md:table-cell w-1/6">Total Debt with Interest</TableHead>
                                    <TableHead className="hidden lg:table-cell w-1/6">Accumulated Interest</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {borrowDetails.map((item: BorrowDetailsWithInterest, index: number) => (
                                    <Credenza key={index} open={openCredenza === 'repayBorrow'} onOpenChange={(open) => setOpenCredenza(open ? 'repayBorrow' : null)}>
                                        <CredenzaTrigger asChild>
                                            <TableRow onClick={() => handleCredenzaOpen(item)} className='cursor-pointer'>
                                                <TableCell className="text-xs md:text-base">{isBigInt(item.borrowDetails.id) ? formatUnits(item.borrowDetails.id, 0) : "N/A"}</TableCell>
                                                <TableCell className="hidden md:table-cell text-xs md:text-base">
                                                    {middleEllipsis(item.borrowDetails.collateralAddress, 6)}
                                                </TableCell>
                                                <TableCell className="text-xs md:text-base">{formatToDollars(formatUnits(item.borrowDetails.amountOfJatCoinBorrowed, 18))}</TableCell>
                                                <TableCell className="text-xs md:text-base">
                                                    {new Date(Number(item.borrowDetails.borrowTime) * 1000).toLocaleString()}
                                                    <br />
                                                    <span className="text-xs text-gray-500">
                                                        ({formatDistanceToNow(new Date(Number(item.borrowDetails.borrowTime) * 1000), { addSuffix: true })})
                                                    </span>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-xs md:text-base">{formatToDollars(formatUnits(item.totalDebtWithInterest, 18))}</TableCell>
                                                <TableCell className="hidden lg:table-cell text-xs md:text-base">{formatToDollars(formatUnits(item.accumulatedInterest, 18))}</TableCell>
                                            </TableRow>
                                        </CredenzaTrigger>
                                        <CredenzaContent>
                                            <RepayBorrow
                                                open={openCredenza === 'repayBorrow'}
                                                onOpenChange={(open) => setOpenCredenza(open ? 'repayBorrow' : null)}
                                                borrowDetails={selectedBorrowDetails}
                                                collateralAddress={item.borrowDetails.collateralAddress}
                                            />
                                        </CredenzaContent>
                                    </Credenza>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default BorrowDetailsTable;
