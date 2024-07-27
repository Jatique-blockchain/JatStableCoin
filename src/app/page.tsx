import { Header } from "./dashboard/header";
import JatCoinYield from "./dashboard/HomePage/earnWithJatcoin";
import JatCoinOverview from "./dashboard/HomePage/hero";
import { JatCoinPage } from "./dashboard/HomePage/how-to-step";
import JatCoinGovernance from "./dashboard/HomePage/jatCoinGovernance";
import JatCoinMechanism from "./dashboard/HomePage/jatCoinMechanism";
import JatCoinStability from "./dashboard/HomePage/jatCoinStablily";
import StickySection from "./dashboard/HomePage/stickySection";
import WhyJatCoinSection from "./dashboard/HomePage/why-section";

export default function Home() {
  return (
    <div className="items-center justify-center bg-neutral-950">
      <div>
        <Header />
      </div>

      <main className="bg-neutral-950">
        <JatCoinOverview />
      </main>

      {/* <StickySection>
        <main className="bg-neutral-950">
          <JatCoinPage />
        </main>
      </StickySection> */}
      <StickySection>
        <WhyJatCoinSection />
      </StickySection>
      <StickySection className="mx-auto">
        <JatCoinYield />
      </StickySection>
      <StickySection className="mx-auto">
        <JatCoinGovernance />
      </StickySection>
      <StickySection className="mx-auto">
        <JatCoinMechanism />
      </StickySection>
      <StickySection className="mx-auto">
        <JatCoinStability />
      </StickySection>

      {/* <StickySection> */}
      {/* <main className="bg-neutral-950">
        <WhyUseSDK />
      </main> */}
      {/* </StickySection> */}

    </div>
  );
}
