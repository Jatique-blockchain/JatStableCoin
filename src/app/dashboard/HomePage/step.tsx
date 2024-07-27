"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimate, useInView } from "framer-motion";

interface FeatureProps {
    title: string;
    text: string;
    icon: string;
}

interface FeatureElementProps extends FeatureProps {
    selected: number;
    isSelected: boolean;
    index: number;
    setSelected: (index: number) => void;
}

const JatCoinInvestmentGuide: React.FC = () => {
    const [selected, setSelected] = useState<number>(0);
    const [scope, animate] = useAnimate();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [manualSelect, setManualSelect] = useState<boolean>(false);

    const investmentSteps: FeatureProps[] = [
        {
            title: "Research JatCoin",
            text: "Learn about JatCoin's features, benefits, and risks before investing.",
            icon: "path/to/research-icon.svg",
        },
        {
            title: "Choose a Platform",
            text: "Select a reputable exchange or platform that supports JatCoin trading.",
            icon: "path/to/platform-icon.svg",
        },
        {
            title: "Create an Account",
            text: "Sign up and complete the verification process on your chosen platform.",
            icon: "path/to/account-icon.svg",
        },
        {
            title: "Fund Your Account",
            text: "Deposit funds into your account using supported payment methods.",
            icon: "path/to/fund-icon.svg",
        },
        {
            title: "Buy JatCoin",
            text: "Place an order to purchase JatCoin at the current market price or set limit order.",
            icon: "path/to/buy-icon.svg",
        },
    ];

    const startAnimationSequence = async () => {
        if (!manualSelect) {
            for (let i = 0; i < investmentSteps.length; i++) {
                if (manualSelect) break;
                setSelected(i);
                await animate(scope.current, { opacity: 1 });
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Increased delay to 3 seconds
            }
            if (!manualSelect) startAnimationSequence();
        }
    };

    const handleClick = (index: number) => {
        setSelected(index);
        setManualSelect(true);
        setTimeout(() => {
            setManualSelect(false);
            startAnimationSequence();
        }, 5000); // Increased delay to 5 seconds
    };

    useEffect(() => {
        if (inView) {
            startAnimationSequence();
        }
    }, [inView]);

    return (
        <div className="mx-auto flex items-center justify-center overflow-hidden" ref={ref}>
            <div className="relative mt-16 grid md:grid-cols-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 flex md:col-span-5 md:mb-0 md:flex-col md:gap-4"
                    ref={scope}
                >
                    {investmentSteps.map((step, index) => (
                        <FeatureElement
                            key={index}
                            selected={selected}
                            isSelected={selected === index}
                            setSelected={handleClick}
                            index={index}
                            {...step}
                        />
                    ))}
                </motion.div>

                <div className="rounded-lg border-[#14181D] bg-[#0D0D11] bg-opacity-90 backdrop-blur-lg backdrop-filter md:col-span-7">
                    <div className="w-full border-b border-[#14181D]">
                        <div className="flex max-w-max items-center gap-2 border-b-2 border-[#8690EA] bg-white bg-opacity-5 px-6 py-1.5 text-sm text-[#CCCDF0] text-opacity-75">
                            JatCoin Investment Guide
                        </div>
                    </div>
                    <div className="custom-scrollbar p-6 text-sm text-white" style={{ height: `calc(100% - 35px)` }}>
                        {investmentSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: selected >= index ? 1 : 0 }}
                                transition={{ duration: 0.5 }}
                                className={`mb-4 ${selected === index ? 'font-bold' : ''}`}
                            >
                                <h3 className="text-lg">{step.title}</h3>
                                <p>{step.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureElement: React.FC<FeatureElementProps> = ({
    selected,
    icon,
    isSelected,
    title,
    text,
    index,
    setSelected,
}) => {
    const thisElement = useRef<HTMLDivElement>(null);
    return (
        <motion.div
            className="flex items-center"
            ref={thisElement}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div
                className={`flex w-full max-w-xs cursor-pointer rounded-md border bg-slate-950 transition-all md:p-5 ${isSelected
                    ? "border-t-main bg-opacity-5 md:border-orange-500"
                    : "border-white border-opacity-10 bg-opacity-0 hover:bg-opacity-5"
                    }`}
                onClick={() => setSelected(index)}
            >
                <div>
                    <h3 className={`md:text-md text-xs md:font-bold ${isSelected ? "text-red-500" : "text-white"}`}>
                        {title}
                    </h3>
                    <p className={`mt-2 hidden text-xs text-opacity-75 ${isSelected ? "" : "text-white"} md:block`}>
                        {text}
                    </p>
                </div>
            </div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isSelected ? "50%" : "0" }}
                transition={{ duration: 0.5 }}
                className="hidden transition-all delay-300 duration-1000 md:block"
                style={{
                    background: isSelected
                        ? "linear-gradient(90deg, #8690EA 0%, rgba(134, 144, 234, 0) 100%)"
                        : "rgb(255,255,255,0)",
                    height: 2,
                    opacity: isSelected ? 1 : 0,
                }}
            ></motion.div>
        </motion.div>
    );
};

export default JatCoinInvestmentGuide;
