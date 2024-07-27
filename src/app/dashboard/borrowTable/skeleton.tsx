// TableSkeleton.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TableSkeleton: React.FC = () => {
    return (
        <Card className="dark:bg-background dark:border-neutral-800">
            <CardHeader>
                <CardTitle><div className="h-6 w-[150px] bg-secondary/50 animate-pulse rounded"></div></CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></th>
                                <th><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></th>
                                <th><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></th>
                                <th><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></th>
                                <th><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    <td><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></td>
                                    <td><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></td>
                                    <td><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></td>
                                    <td><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></td>
                                    <td><div className="h-4 w-[100px] bg-secondary/50 animate-pulse rounded"></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default TableSkeleton;
