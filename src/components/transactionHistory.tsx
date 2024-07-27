// "use client";
// import { useInView } from 'react-intersection-observer';
// import { useEffect } from 'react';
// import { Address } from 'viem';
// import React from 'react';
// import Loading from './loader';
// import CustomMessageCard from './customMessage';
// import { TransactionCard } from './TransactionCard';
// import { useTransactionHistoryEvents } from '../../hooks/useTransacionHook';
// import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';

// export default function TransactionHistory() {
//     const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useTransactionHistoryEvents(JATENGINE_CONTRACT_ADDRESS);
//     const { ref, inView } = useInView();

//     useEffect(() => {
//         if (inView && hasNextPage && !isFetchingNextPage) {
//             fetchNextPage();
//         }
//     }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//     if (status === 'pending') return (
//         <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
//             <Loading className='h-screen w-screen' />
//         </div>
//     );
//     if (status === 'error') return <CustomMessageCard message={'An error occurred while loading the transaction history'} />;
//     if (data.pages.length === 0) return <CustomMessageCard message={'No transactions found'} />;
//     return (
//         <section className="w-full py-12">
//             <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
//                 <div className="grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
//                     {data.pages.map((page, i) => (
//                         <React.Fragment key={i}>
//                             {page.events.map((event, index) => (
//                                 <TransactionCard key={`${event.timestamp}-${index}`} event={event} />
//                             ))}
//                         </React.Fragment>
//                     ))}
//                 </div>
//                 {hasNextPage && (
//                     <div ref={ref} className="flex justify-center items-center p-4">
//                         {isFetchingNextPage ? (
//                             <div>Loading more...</div>
//                         ) : (
//                             <div>Scroll to load more</div>
//                         )}
//                     </div>
//                 )}
//                 {!hasNextPage && (
//                     <div className="flex justify-center items-center p-4">
//                         No more transactions to load
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }


"use client";
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { Address } from 'viem';
import React from 'react';
import Link from 'next/link';
import Loading from './loader';
import CustomMessageCard from './customMessage';
import { TransactionCard } from './TransactionCard';
import { useTransactionHistoryEvents } from '../../hooks/useTransacionHook';
import { JATENGINE_CONTRACT_ADDRESS } from '@/constants';
import { InfiniteData, FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { Button } from './ui/button';


interface TransactionHistoryProps {
    notLoadMore?: boolean;
}



export default function TransactionHistory({ notLoadMore = false }: TransactionHistoryProps): JSX.Element {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useTransactionHistoryEvents(JATENGINE_CONTRACT_ADDRESS as Address);

    const { ref, inView } = useInView();

    const totalEvents = useMemo(() => {
        return data?.pages.reduce((total, page) => total + page.events.length, 0) || 0;
    }, [data]);

    const shouldLoadMore = useMemo(() => {
        return !notLoadMore || (notLoadMore && totalEvents < 5);
    }, [notLoadMore, totalEvents]);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage && shouldLoadMore) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, shouldLoadMore]);

    if (status === 'pending') return (
        <div className="">
            <Loading className='w-screen h-[70dvh]' />
        </div>
    );
    if (status === 'error') return <CustomMessageCard message={'An error occurred while loading the transaction history'} />;
    if (data.pages.length === 0) return <CustomMessageCard message={'No transactions found'} />;

    const SeeMoreButton = (): JSX.Element => (
        <Link href="/dashboard/transactionHistory">
            <Button variant={"link"} className="text-white font-bold py-2 px-4 rounded">
                See More
            </Button>
        </Link>
    );

    return (
        <section className="w-full py-12 space-y-4">
            <div className="text-center text-2xl font-bold">
                Transaction History
            </div>
            <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
                <div className="grid md:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
                    {data.pages.map((page, i) => (
                        <React.Fragment key={i}>
                            {page.events.map((event, index) => (
                                <TransactionCard key={`${event.timestamp}-${index}`} event={event} />
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                {shouldLoadMore && hasNextPage && (
                    <div ref={ref} className="flex justify-center items-center p-4">
                        {isFetchingNextPage ? (
                            <div>Loading more...</div>
                        ) : (
                            <div>Scroll to load more</div>
                        )}
                    </div>
                )}
                {!shouldLoadMore && hasNextPage && (
                    <div className="flex justify-center items-center p-4">
                        <SeeMoreButton />
                    </div>
                )}
                {!hasNextPage && (
                    <div className="flex justify-center items-center p-4">
                        No more transactions to load
                    </div>
                )}
            </div>
        </section>
    );
}
