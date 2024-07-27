// HistoryTable.tsx
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HistoryTableProps {
    title: string;
    data: Array<{
        user: string;
        amount: string; // Assuming amount is a string based on the given data
        date: string;
        statusVariant?: "default" | "secondary" | "destructive" | "outline" | null | undefined; // Adjusted to match given data
    }>;
}

const HistoryTable: React.FC<HistoryTableProps> = ({ title, data }) => {
    return (
        <Card className="dark:bg-background dark:border-neutral-800">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.user}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.date}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default HistoryTable;
