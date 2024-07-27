import React from 'react';
import useJatCoinMintedEvents from '../../../../hooks/usejatMintCoin';

interface JatCoinMintedEventsComponentProps {
    userAddress: `0x${string}`;
    contractAddress: `0x${string}`;
}

const JatCoinMintedEventsComponent: React.FC<JatCoinMintedEventsComponentProps> = ({ userAddress, contractAddress }) => {
    const {
        data,
        isFetching,
        isError,
        error,
        isPlaceholderData,
        fetchNextPage,
        fetchPreviousPage,
        page,
    } = useJatCoinMintedEvents(userAddress, contractAddress);

    return (
        <div>
            <h1>JatCoin Minted Events</h1>
            {isFetching && <p>Loading...</p>}
            {data && (
                <table>
                    <thead>
                        <tr>
                            <th>Borrower</th>
                            <th>Borrow ID</th>
                            <th>Amount</th>
                            <th>Collateral Address</th>
                            <th>Timestamp</th>
                            <th>Block Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((event, index) => (
                            <tr key={index}>
                                <td>{event.borrower}</td>
                                <td>{event.borrowId.toString()}</td>
                                <td>{event.amount.toString()}</td>
                                <td>{event.collateralAddress}</td>
                                <td>{new Date(Number(event.timestamp) * 1000).toLocaleString()}</td>
                                <td>{event.blockNumber.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div>
                <button onClick={fetchPreviousPage} disabled={page === 1 || isFetching}>
                    Previous Page
                </button>
                <button onClick={fetchNextPage} disabled={isFetching}>
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default JatCoinMintedEventsComponent;
