// Dashboard.tsx
"use client";
import React from 'react';

import HistoryTable from './historyTable';
import Sidebar from './sidebar';
import Cards from './card-3';
import { Header } from './header';


interface HistoryRecord {
    user: string;
    amount: string; // Assuming amount is a string based on the given data
    date: string;
    statusVariant?: "default" | "secondary" | "destructive" | "outline" | null | undefined; // Adjusted to match given data

}

const repayHistory: HistoryRecord[] = [
    { user: "User 1", amount: "$1,000", date: "2023-01-01", statusVariant: "default" },
    { user: "User 2", amount: "$2,000", date: "2023-01-02", statusVariant: "destructive" },
    { user: "User 3", amount: "$3,000", date: "2023-01-03", statusVariant: "destructive" },
];

const borrowHistory: HistoryRecord[] = [
    { user: "User 4", amount: "$4,000", date: "2023-01-04", statusVariant: "default" },
    { user: "User 5", amount: "$5,000", date: "2023-01-05", statusVariant: "destructive" },
    { user: "User 6", amount: "$6,000", date: "2023-01-06", statusVariant: "destructive" },
];

const depositHistory: HistoryRecord[] = [
    { user: "User 7", amount: "$7,000", date: "2023-01-07", statusVariant: "default" },
    { user: "User 8", amount: "$8,000", date: "2023-01-08", statusVariant: "destructive" },
    { user: "User 9", amount: "$9,000", date: "2023-01-09", statusVariant: "destructive" },
];

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col">



            <div className="flex flex-col ">
                <Cards />
            </div>

        </div>

    );
};

export default Dashboard;
