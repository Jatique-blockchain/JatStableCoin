import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatUnits } from 'viem';
import { middleEllipsis } from '@/lib/format-address';
import { formatToDollars } from '@/lib/formatToDollars';
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useCollateralDepositedEvents } from '../../../../hooks/useCollateralDepositedEvent';
import { formatDistanceToNow } from 'date-fns';
import Loading from '@/components/loader';
import CustomMessageCard from '@/components/customMessage';

const ContractEvents: React.FC = () => {
    const { events, isLoading, error } = useCollateralDepositedEvents(JATENGINE_CONTRACT_ADDRESS);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center h-screen w-screen bg-opacity-50 z-50">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <CustomMessageCard message="Error loading collateral deposited " />;
    }

    return (
        <Card className="mt-4 dark:bg-background dark:border-neutral-800">
            <CardHeader>
                <CardTitle>Collateral Deposited</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3 md:w-1/4">User</TableHead>
                                <TableHead className="hidden md:table-cell w-1/4">Collateral Address</TableHead>
                                <TableHead className="w-1/3 md:w-1/4">Amount</TableHead>
                                <TableHead className="w-1/3 md:w-1/4">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-xs md:text-base">{middleEllipsis(event.user, 6)}</TableCell>
                                    <TableCell className="hidden md:table-cell text-xs md:text-base">{middleEllipsis(event.collateralAddress, 6)}</TableCell>
                                    <TableCell className="text-xs md:text-base">{formatToDollars(formatUnits(event.amount, 18))}</TableCell>
                                    <TableCell className="text-xs md:text-base">
                                        {new Date(Number(event.timestamp) * 1000).toLocaleString()}
                                        <br />
                                        <span className="text-xs text-gray-500">
                                            ({formatDistanceToNow(new Date(Number(event.timestamp) * 1000), { addSuffix: true })})
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContractEvents;
