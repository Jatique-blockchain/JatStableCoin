// components/JatCoinGovernance.tsx
import React from "react";
import Image from "next/image";
import ShineBorder from "@/components/ui/shine-border";


const JatCoinGovernance: React.FC = () => {
    const section = {
        title: "Community-Driven Governance",
        description:
            "JatCoin is governed by the Jatique DAO, ensuring a truly decentralized and community-driven approach. Token holders can participate in key decisions, including risk parameters, interest rates, and protocol upgrades. This governance model ensures that JatCoin remains responsive to user needs and adaptable to market conditions.",
        imageUrl: "/jatcoin-governance-2.png", // Replace with an appropriate image
        reverse: false,
    };

    return (
        // components/JatCoinGovernance.tsx (continued)
        <section className="body-font h-screen mx-auto flex max-w-[99dvw] flex-col items-center justify-center overflow-hidden bg-neutral-950 text-gray-600  md:max-w-[98dvw] lg:max-w-[96dvw]">
            <div
                className={`container mx-auto flex items-center overflow-hidden px-5 ${section.reverse ? "flex-col md:flex-row" : "flex-col-reverse md:flex-row-reverse"}`}
            >
                <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
                    <h1 className="title-font mb-4  bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-amber-600 via-sky-500 to-teal-300 bg-clip-text text-3xl font-medium  text-transparent  sm:text-4xl md:text-5xl">

                        {section.title}
                    </h1>
                    <p className="mb-8 text-xs leading-relaxed  text-gray-300 sm:text-sm md:text-lg">
                        {section.description}
                    </p>
                    <div className="flex justify-center">
                        <ShineBorder
                            className="md:text-md text-center text-sm font-bold capitalize"
                            color={["#4B9CD3", "#8A2BE2", "#4169E1"]}
                        >
                            Learn More
                        </ShineBorder>

                    </div>
                </div>
                <div className="relative w-5/6 overflow-hidden md:w-1/2 lg:w-full lg:max-w-lg">
                    <Image
                        className="bg-inherit object-cover rounded-full object-center"
                        alt="JatCoin Governance"
                        width={700}
                        height={700}
                        quality={100}
                        src={section.imageUrl}
                    />
                </div>
            </div>
        </section>
    );
};

export default JatCoinGovernance;
