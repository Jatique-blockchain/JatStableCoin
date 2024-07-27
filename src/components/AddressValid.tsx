"use client";
import React, { ReactNode } from 'react';
import { FaExclamationTriangle, FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { ConnectBtn } from './connectButton';
import { Button } from './ui/button';

interface WalletWrapperProps {
    children: ReactNode;
}

const WalletWrapper: React.FC<WalletWrapperProps> = ({ children }) => {
    const { address } = useAccount();

    if (address === null || address === undefined) {
        return (
            <div className='flex items-center justify-center h-screen w-screen'>
                <div className="container mx-auto p-4">
                    <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 max-w-md mx-auto">
                        <div className="flex flex-col items-center space-y-4">
                            <FaExclamationTriangle className="text-destructive text-4xl" />
                            <h2 className="text-2xl font-heading font-bold text-center">Wallet Not Connected</h2>
                            <p className="text-muted-foreground text-center">
                                Please connect your wallet to access this feature.
                            </p>
                            <div className="flex  items-center justify-center space-x-2 text-accent">
                                <FaWallet className="text-xl" />

                                <ConnectBtn />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    return <>{children}</>;
};

export default WalletWrapper;
