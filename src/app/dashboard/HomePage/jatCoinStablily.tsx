// components/JatCoinStability.tsx
import React from "react";
import Image from "next/image";
import ShineBorder from "@/components/ui/shine-border";


const JatCoinStability: React.FC = () => {
    const section = {
        title: "JatCoin Stability Mechanism",
        description:
            "JatCoin maintains its stability through an innovative over-collateralization system. Users deposit collateral assets into the Jatique protocol, allowing them to mint JatCoin. Our advanced algorithms continuously monitor market conditions and adjust collateral ratios to ensure JatCoin's peg to its target value, providing users with a reliable and stable digital asset.",
        imageUrl: "/jatcoin-stabiliity.png", // Replace with an appropriate image
        reverse: false,
    };

    return (
        <section className="body-font mx-auto flex h-screen max-w-[99dvw] flex-col items-center justify-center overflow-hidden  text-gray-600 bg-neutral-950 md:max-w-[99dvw] lg:max-w-[99dvw]">
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
                        className="bg-inherit object-cover object-center"
                        alt="JatCoin Stability Mechanism"
                        width={2000}
                        height={2000}
                        quality={70}
                        src={section.imageUrl}
                    />
                </div>
            </div>
        </section>
    );
};

export default JatCoinStability;
