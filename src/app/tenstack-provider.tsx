// app/providers.jsx
'use client'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

export function TenstackProviders(props: { children: React.ReactNode }) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                queryCache: new QueryCache({
                    onError: (error) => {
                        console.error('Global Query Error:', { error })
                    },
                    onSettled(data, error, query) {
                        console.log('Global Query Settled:', { data, error, query })
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (error) => {
                        console.error('Global Mutation Error:', { error })
                    },
                    onSettled(data, error, variables, context, mutation) {
                        console.log('Global Mutation Settled:', { data, error, variables, context, mutation })
                    },
                }),
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 1000, // 5 seconds in milliseconds
                        // refetchInterval: 5 * 1000
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}
