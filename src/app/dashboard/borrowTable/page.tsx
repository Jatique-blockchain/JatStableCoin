"use client";
import React from 'react'
import BorrowDetailsTable from './table'
import JatCoinMintedEventsComponent from './testing-logs'
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useAccount } from 'wagmi';
import ContractEvents from './testing-logs-2';

const BorrowPage = () => {
    const { address: userAddress } = useAccount();

    return (
        <div>
            <BorrowDetailsTable />

        </div>
    )
}

export default BorrowPage