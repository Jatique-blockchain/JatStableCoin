// CredenzaContents.tsx
import React from 'react';

export const HealthFactorContent = () => (
    <div>
        <h3 className="text-lg font-semibold">Health Factor Details</h3>
        <p>Your current health factor is 1.5. Maintaining a high health factor reduces the risk of liquidation.</p>
    </div>
);

export const CollateralDepositContent = () => (
    <div>
        <h3 className="text-lg font-semibold">Collateral Deposit Information</h3>
        <p>You have deposited 10 WETH and 5 WBTC as collateral. Consider diversifying your collateral to reduce risk.</p>
    </div>
);

export const TotalBorrowedContent = () => (
    <div>
        <h3 className="text-lg font-semibold">Total Borrowed Overview</h3>
        <p>You have borrowed $1,234,567 in total. This amount has increased by 5.2% this month.</p>
    </div>
);

export const TotalRepaidContent = () => (
    <div>
        <h3 className="text-lg font-semibold">Total Repaid Summary</h3>
        <p>You have repaid $987,654 in total. This amount has decreased by 2.1% this month.</p>
    </div>
);

export const TotalLiquidatedContent = () => (
    <div>
        <h3 className="text-lg font-semibold">Total Liquidated Information</h3>
        <p>The total liquidated amount is $123,456. This has increased by 8.3% this month.</p>
    </div>
);
