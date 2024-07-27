"use client";
import React from 'react';
import { useReadContract } from 'wagmi';
import { Card } from "@/components/ui/card";
import { formatUnits } from 'viem';
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import jatEngineAbi from "../../../../abis/jatEngine.json";
import CardSkeleton from './cardSkeleton';
import { middleEllipsis } from '@/lib/format-address';
import CustomMessageCard from '@/components/customMessage';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component from shadcn

interface UserHealthFactor {
    user: string;
    healthFactor: bigint;
}

interface HealthFactorCardsProps {
    loadSmall?: boolean;
}

const HealthFactorCards: React.FC<HealthFactorCardsProps> = ({ loadSmall = false }) => {
    const { data: usersWithLowHealthFactor, isLoading, isError, error } = useReadContract({
        address: JATENGINE_CONTRACT_ADDRESS,
        abi: jatEngineAbi,
        functionName: 'getUsersWithHealthFactorBelowOne',
        scopeKey: 'usersWithLowHealthFactor',
    });

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        );
    }
    if (isError) return <CustomMessageCard message={`An error occurred while loading the defaulters ${(error as Error).message}`} />;
    if (!usersWithLowHealthFactor || (usersWithLowHealthFactor as UserHealthFactor[]).length === 0) return <CustomMessageCard message={'No defaulters found'} />;
    const sortedUsers = (usersWithLowHealthFactor as UserHealthFactor[]).sort((a, b) => {
        return Number(a.healthFactor) - Number(b.healthFactor);
    });

    const usersToDisplay = loadSmall ? sortedUsers.slice(0, 6) : sortedUsers;

    return (
        <div>
            <div className="text-xl font-bold mb-4 text-center">Defaulters</div> {/* Add the text defaulters as the title */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {usersToDisplay.map((userHealthFactor) => (
                    <Link key={userHealthFactor.user} href={`/dashboard/liquidateUserTable?borrowerAddress=${userHealthFactor.user}`}>
                        <Card className="bg-background p-4 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Wallet Address</div>
                                <div className="text-sm font-medium">{middleEllipsis(userHealthFactor.user, 6)}</div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">Health Factor</div>
                                <div className="text-lg font-semibold text-red-500 animate-pulse">{Number(formatUnits(userHealthFactor.healthFactor, 18)).toFixed(4)}</div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {loadSmall && (
                <div className="mt-4 text-center">
                    <Link href="/dashboard/lowHealthFactor">
                        <Button>See More</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HealthFactorCards;
