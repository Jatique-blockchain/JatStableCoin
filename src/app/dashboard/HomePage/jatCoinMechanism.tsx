// components/JatCoinMechanism.tsx
import React from "react";
import Image from "next/image";
import ShineBorder from "@/components/ui/shine-border";


const JatCoinMechanism: React.FC = () => {
    const section = {
        title: "JatCoin Minting Mechanism",
        description:
            "JatCoin utilizes an innovative over-collateralization system to maintain its stability. Users can mint JatCoin by depositing collateral into the Jatique protocol. The system automatically manages collateral ratios and liquidations to ensure the stability of JatCoin, providing a secure and efficient stablecoin solution.",
        imageUrl: "/jatcoin-mechanism.png", // Replace with an appropriate image
        reverse: true,
    };

    return (
        <section className="body-font h-screen mx-auto flex max-w-[99dvw] flex-col items-center justify-center overflow-hidden  py-6 text-gray-600 bg-neutral-950 md:max-w-[98dvw] md:py-0 lg:max-w-[96dvw]">
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
                            color={["#4B9CD3", "#8A2BE2", "#4169E1"]}
                        >
                            Learn More
                        </ShineBorder>

                    </div>
                </div>
                <div className="relative w-5/6 overflow-hidden md:w-1/2 lg:w-full lg:max-w-lg">
                    <Image
                        className="bg-inherit bg-neutral-950 rounded-full object-cover object-center"
                        alt="JatCoin Mechanism"
                        width={700}
                        height={700}
                        quality={70}
                        src={section.imageUrl}
                    />
                </div>
            </div>
        </section>
    );
};

export default JatCoinMechanism;
