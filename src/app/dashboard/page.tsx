import WalletWrapper from "@/components/AddressValid";
import Dashboard from "./aside-2";
import { Suspense } from "react";
import Loading from "@/components/loader";
import TransactionHistory from "@/components/transactionHistory";
import HealthFactorCards from "./lowHealthFactor/aside";

export default function Home() {

    return (

        <WalletWrapper>
            <Dashboard />
            <div>
                <TransactionHistory notLoadMore={true} />
            </div>
            <HealthFactorCards loadSmall={true} />

        </WalletWrapper>
    );
}
