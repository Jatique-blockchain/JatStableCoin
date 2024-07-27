// TotalBorrowedContent.tsx
import React from 'react';

interface TotalBorrowedContentProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const TotalBorrowedContent: React.FC<TotalBorrowedContentProps> = ({ open, onOpenChange }) => {
    return (
        <div>
            <h2>Health Factor Content</h2>
            <p>This is a dummy component for Health Factor content.</p>
            <button onClick={() => onOpenChange(false)}>Close</button>
        </div>
    );
};

export default TotalBorrowedContent;
