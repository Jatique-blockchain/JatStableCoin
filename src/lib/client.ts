// client.ts
import { http, createPublicClient } from 'viem';
import { localhost } from 'viem/chains';
// const localhost = /*#__PURE__*/ defineChain({
//     id: 31337,

//     name: 'Localhost',
//     nativeCurrency: {
//         decimals: 18,
//         name: 'Ether',
//         symbol: 'ETH',

//     },
//     rpcUrls: {
//         default: { http: ['http://127.0.0.1:8545'] },
//     },
// })
const client = createPublicClient({
    chain: localhost,
    transport: http(),
});

export default client;
