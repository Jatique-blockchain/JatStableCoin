"use client";
import React from 'react'
import BorrowDetailsTable from './table'
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { useAccount } from 'wagmi';
import { useSearchParams } from 'next/navigation';
import CustomMessageCard from '@/components/customMessage';

const BorrowPage = () => {
    const searchParams = useSearchParams();
    const borrowerAddress = searchParams.get('borrowerAddress');
    if (!borrowerAddress) return <CustomMessageCard message={'user address is required'} />



    return (
        <div>
            <BorrowDetailsTable borrowerAddress={borrowerAddress} />

        </div>
    )
}

export default BorrowPage