import React from 'react';
import { Card } from "@/components/ui/card";

const CardSkeleton: React.FC = () => {
    return (
        <Card className="bg-background p-4 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
        </Card>
    );
};

export default CardSkeleton;
