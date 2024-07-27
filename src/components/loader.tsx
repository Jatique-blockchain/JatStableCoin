import { cn } from '@/lib/utils';
import React from 'react';

import "./loader.css"
interface LoadingProps {
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className }) => {
    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loading;
