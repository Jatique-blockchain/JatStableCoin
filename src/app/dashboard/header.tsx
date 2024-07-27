// components/Header.tsx
"use client";
import { usePathname } from 'next/navigation';
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { HomeIcon, LayoutDashboardIcon, BookmarkIcon, ReceiptIcon, DeleteIcon, SettingsIcon, MenuIcon, GhostIcon } from "lucide-react";
import { ConnectBtn } from "@/components/connectButton";

const navItems = [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/dashboard", icon: LayoutDashboardIcon, label: "Dashboard" },
    { href: "/dashboard/borrowTable", icon: BookmarkIcon, label: "BorrowTable" },
    { href: "/dashboard/transactionHistory", icon: ReceiptIcon, label: "History" },
    { href: "/dashboard/lowHealthFactor", icon: DeleteIcon, label: "Defaulters" },
    { href: "/dashboard/liquidateUserTable", icon: DeleteIcon, label: "Liquidate" },
];

export const Header = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname === path || (pathname.startsWith(path) && path !== '/');
    };

    return (
        <header className="sticky top-0 z-30 w-full bg-background dark:bg-background border-b dark:border-neutral-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="mr-4 sm:hidden dark:border-neutral-800 focus:ring-2 focus:ring-primary">
                                    <MenuIcon className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 sm:max-w-sm dark:bg-background dark:border-neutral-800">
                                <nav className="flex flex-col space-y-4 mt-8">

                                    {navItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${isActive(item.href)
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                                                }`}
                                            prefetch={false}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                        {/* <Breadcrumb className="hidden md:flex">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                                            Home
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>GHO Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb> */}
                    </div>
                    <div className="flex items-center space-x-4">
                        <ConnectBtn />
                    </div>
                </div>
            </div>
        </header>
    );
};
