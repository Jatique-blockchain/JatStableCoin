// components/JatCoinYield.tsx
import React from "react";
import Image from "next/image";
import ShineBorder from "@/components/ui/shine-border";

const JatCoinYield: React.FC = () => {
    const section = {
        title: "Earn with JatCoin",
        description:
            "JatCoin offers innovative yield generation opportunities for holders. By participating in the JatCoin ecosystem, users can earn passive income through various mechanisms such as staking, liquidity provision, and governance rewards. Our smart contract system automatically optimizes yields, ensuring competitive returns while maintaining the stability of the JatCoin ecosystem.",
        imageUrl: "/earn-with-jatcoin.png", // Replace with an appropriate image
        reverse: true, // Set to true for alternating layout
    };

    return (
        <section className="body-font h-screen mx-auto flex max-w-[99dvw] flex-col items-center justify-center overflow-hidden bg-neutral-950 text-gray-600 dark:bg-neutral-950 md:max-w-[96dvw] lg:max-w-[96dvw]">
            <div
                className={`container mx-auto flex items-center overflow-hidden px-5 ${section.reverse ? "flex-col md:flex-row" : "flex-col-reverse md:flex-row-reverse"}`}
            >
                <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
                    <h1 className="title-font mb-4  bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-amber-600 via-sky-500 to-teal-300 bg-clip-text text-3xl font-medium  text-transparent  sm:text-4xl md:text-5xl">

                        {section.title}
                    </h1>
                    <p className="mb-8 text-xs leading-relaxed text-gray-300 sm:text-sm md:text-lg">
                        {section.description}
                    </p>
                    <div className="flex justify-center">
                        <ShineBorder
                            className="md:text-md text-center text-sm font-bold capitalize"
                            color={["#4CAF50", "#2196F3", "#9C27B0"]}
                        >
                            Yield Options
                        </ShineBorder>

                    </div>
                </div>
                <div className="relative w-5/6 overflow-hidden md:w-[70%] lg:w-full lg:max-w-lg">
                    <Image
                        className="bg-inherit object-cover object-center"
                        alt="JatCoin Yield Generation"

                        width={1000}
                        height={1000}
                        quality={100}
                        src={section.imageUrl}
                    />
                </div>
            </div>
        </section>
    );
};

export default JatCoinYield;
