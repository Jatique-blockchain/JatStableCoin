"use client";

import { useEffect, useRef } from "react";
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
// Import useRouter for redirection
import RealismButton from "./realism-button";
import { useRouter } from "next/navigation";

export const ConnectBtn = () => {
    const { isConnecting, address, isConnected, chain } = useAccount();
    const { color: backgroundColor, emoji } = emojiAvatarForAddress(
        address ?? ""
    );

    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { disconnect } = useDisconnect();
    const router = useRouter(); // Initialize useRouter

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
    }, []);

    const handleClick = async () => {
        if (!isConnected) {
            // Disconnecting wallet first because sometimes when is connected but the user is not connected
            if (isConnected) {
                disconnect();
            }
            openConnectModal?.();
        } else {
            // Redirect to dashboard
            router.push("/dashboard"); // Adjust the path as needed
        }
    };

    const buttonText = isConnected ? "Dashboard" : (isConnecting ? "Connecting..." : "Get Started");

    if (isConnected && !chain) {
        return (
            <button className="btn" onClick={openChainModal}>
                Wrong network
            </button>
        );
    }

    return (
        <div
            onClick={(e) => {
                handleClick();
            }}
        >
            <RealismButton text={buttonText} />
        </div>
    );
};
