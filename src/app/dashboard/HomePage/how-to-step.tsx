"use client";
import React from "react";
import JatCoinInvestmentGuide from "./step";
import { BackgroundBeams } from "@/components/ui/backgroundBeam";

export function JatCoinPage() {
    return (
        <div className="relative flex h-[105dvh] w-full flex-col overflow-hidden rounded-md bg-neutral-950 antialiased">
            <div className="flex flex-col gap-12">
                <h1 className="relative z-10  bg-gradient-to-l from-cyan-500  via-red-500 to-indigo-400   bg-clip-text text-center font-sans text-3xl  font-bold text-transparent md:text-7xl">

                    The Future of Stablecoins
                </h1>
                <div className="mx-auto">
                    <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#93C5FD_0%,#3B82F6_50%,#93C5FD_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            Learn More About JatCoin
                        </span>
                    </button>
                </div>
            </div>



            <div className="mt-8">
                <JatCoinInvestmentGuide />
            </div>
            <BackgroundBeams />
        </div>
    );
}
