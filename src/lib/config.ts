'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem/chains/utils';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECTION_PROJECTID;
if (!projectId) {
   throw new Error('NEXT_PUBLIC_WALLETCONNECTION_PROJECTID is not set');
}

const localhost = /*#__PURE__*/ defineChain({
   id: 31337,
   name: 'Localhost',
   nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
   },
   rpcUrls: {
      default: { http: ['http://127.0.0.1:8545'] },
   },
});

// Determine the environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Define supported chains based on the environment
const supportedChains: Chain[] = isDevelopment ? [localhost, sepolia] : [sepolia];

export const config = getDefaultConfig({
   appName: "WalletConnection",
   projectId,
   chains: supportedChains as any,
   ssr: true,
   storage: createStorage({
      storage: cookieStorage,
   }),
   transports: supportedChains.reduce((obj, chain) => ({ ...obj, [chain.id]: http() }), {})
});
