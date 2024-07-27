// import React from 'react';
// import Link from "next/link"

// import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
// import { MenuIcon, GhostIcon, HomeIcon, BookmarkIcon, ReceiptIcon, DeleteIcon, SettingsIcon, HandHelpingIcon } from "lucide-react"

// interface NavItem {
//     href: string;
//     icon: React.ElementType;
//     label: string;
// }

// const navItems: NavItem[] = [
//     { href: "#", icon: HomeIcon, label: "Dashboard" },
//     { href: "dashboard/borrowTable", icon: BookmarkIcon, label: "BorrowTable" },
//     { href: "dashboard/transactionHistory", icon: ReceiptIcon, label: "History" },
//     { href: "#", icon: DeleteIcon, label: "Liquidation" },
//     { href: "#", icon: SettingsIcon, label: "Settings" },
// ];

// const Sidebar: React.FC = () => {
//     return (
//         <>
//             {/* Mobile Sidebar */}

//             {/* Desktop Sidebar */}
//             <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background dark:border-neutral-800 md:flex">
//                 <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
//                     <TooltipProvider>
//                         <Link
//                             href="#"
//                             className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base dark:bg-primary dark:text-primary-foreground"
//                             prefetch={false}
//                         >
//                             <GhostIcon className="h-4 w-4 transition-all group-hover:scale-110" />
//                             <span className="sr-only">GHO Dashboard</span>
//                         </Link>
//                         {navItems.map((item) => (
//                             <Tooltip key={item.label}>
//                                 <TooltipTrigger asChild>
//                                     <Link
//                                         href={item.href}
//                                         className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
//                                         prefetch={false}
//                                     >
//                                         <item.icon className="h-5 w-5" />
//                                         <span className="sr-only">{item.label}</span>
//                                     </Link>
//                                 </TooltipTrigger>
//                                 <TooltipContent side="right">{item.label}</TooltipContent>
//                             </Tooltip>
//                         ))}
//                     </TooltipProvider>
//                 </nav>
//                 <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Link
//                                     href="#"
//                                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
//                                     prefetch={false}
//                                 >
//                                     <HandHelpingIcon className="h-5 w-5" />
//                                     <span className="sr-only">Help</span>
//                                 </Link>
//                             </TooltipTrigger>
//                             <TooltipContent side="right">Help</TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </nav>
//             </aside>
//         </>
//     );
// };

// export default Sidebar;

// components/Sidebar.tsx
"use client";
import React from 'react';
import Link from "next/link"
import { usePathname } from 'next/navigation';

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { GhostIcon, HomeIcon, LayoutDashboardIcon, BookmarkIcon, ReceiptIcon, DeleteIcon, SettingsIcon, HandHelpingIcon } from "lucide-react"

interface NavItem {
    href: string;
    icon: React.ElementType;
    label: string;
}

const navItems: NavItem[] = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/dashboard", icon: LayoutDashboardIcon, label: "Dashboard" },
    { href: "/dashboard/borrowTable", icon: BookmarkIcon, label: "BorrowTable" },
    { href: "/dashboard/transactionHistory", icon: ReceiptIcon, label: "History" },
    { href: "/dashboard/lowHealthFactor", icon: DeleteIcon, label: "Defaulters" },
    { href: "/dashboard/liquidateUserTable", icon: DeleteIcon, label: "Liquidate" },
];

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname === path || (pathname.startsWith(path) && path !== '/');
    };

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background dark:border-neutral-800 md:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Link
                        href="/"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base dark:bg-primary dark:text-primary-foreground"
                        prefetch={false}
                    >
                        <GhostIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">GHO Dashboard</span>
                    </Link>
                    {navItems.map((item) => (
                        <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.href}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${isActive(item.href)
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
                                        }`}
                                    prefetch={false}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
                                prefetch={false}
                            >
                                <HandHelpingIcon className="h-5 w-5" />
                                <span className="sr-only">Help</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Help</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
};

export default Sidebar;
