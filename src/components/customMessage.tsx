// CustomMessageCard.tsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface CustomMessageCardProps {
    message: string;
}

const CustomMessageCard: React.FC<CustomMessageCardProps> = ({ message }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 max-w-md mx-auto">
                <div className="flex flex-col items-center space-y-4">
                    <FaExclamationTriangle className="text-destructive text-4xl" />
                    <h2 className="text-2xl font-heading font-bold text-center">{message}</h2>
                </div>
            </div>
        </div>
    );
};

export default CustomMessageCard;
