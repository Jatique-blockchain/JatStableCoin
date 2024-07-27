// TotalRepaidContent.tsx
import React from 'react';

interface TotalRepaidContentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tokenInvolved: "WETH" | "WBTC";
}

const TotalRepaidContent: React.FC<TotalRepaidContentProps> = ({ open, onOpenChange, tokenInvolved }) => {
    return (
        <div>
            <h2>Health Factor Content</h2>
            <p>This is a dummy component for Health Factor content.</p>
            <button onClick={() => onOpenChange(false)}>Close</button>
        </div>
    );
};

export default TotalRepaidContent;
