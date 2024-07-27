/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IZjoEbo6fkf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { JSX, SVGProps, useState } from "react"
import { GhostIcon, HomeIcon, BookmarkIcon, ReceiptIcon, DeleteIcon, SettingsIcon, HandHelpingIcon, MenuIcon, SearchIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Dashboard() {
    const [selectedCoin, setSelectedCoin] = useState("total")
    return (
        <div className="flex min-h-screen w-full flex-col bg-background dark:bg-background">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background dark:border-neutral-800 sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Link
                            href="#"
                            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base dark:bg-primary dark:text-primary-foreground"
                            prefetch={false}
                        >
                            <GhostIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">GHO Dashboard</span>
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:bg-accent dark:text-accent-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <BookmarkIcon className="h-5 w-5" />
                                    <span className="sr-only">Borrow</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Borrow</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <ReceiptIcon className="h-5 w-5" />
                                    <span className="sr-only">Repay</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Repay</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <DeleteIcon className="h-5 w-5" />
                                    <span className="sr-only">Liquidation</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Liquidation</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <SettingsIcon className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
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
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 dark:bg-background dark:border-neutral-800">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden dark:border-neutral-800">
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs dark:bg-background dark:border-neutral-800">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base dark:bg-primary dark:text-primary-foreground"
                                    prefetch={false}
                                >
                                    <GhostIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">GHO Dashboard</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <HomeIcon className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground dark:text-foreground"
                                    prefetch={false}
                                >
                                    <BookmarkIcon className="h-5 w-5" />
                                    Borrow
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <ReceiptIcon className="h-5 w-5" />
                                    Repay
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <DeleteIcon className="h-5 w-5" />
                                    Liquidation
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
                                    prefetch={false}
                                >
                                    <SettingsIcon className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="#" prefetch={false}>
                                        Dashboard
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>GHO Dashboard</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] dark:bg-background"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="overflow-hidden rounded-full dark:border-neutral-800">
                                <img
                                    src="/placeholder.svg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="dark:bg-background dark:border-neutral-800">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Total Borrowed</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">$1,234,567</div>
                                    <TrendingUpIcon className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">+5.2% this month</div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Total Repaid</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">$987,654</div>
                                    <TrendingDownIcon className="h-6 w-6 text-red-500" />
                                </div>
                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">-2.1% this month</div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Total Liquidated</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">$123,456</div>
                                    <TrendingUpIcon className="h-6 w-6 text-yellow-500" />
                                </div>
                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">+8.3% this month</div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Health Factor</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-4xl font-bold">1.5</div>
                                    <TrendingUpIcon className="h-6 w-6 text-green-500" />
                                </div>
                                <div className="text-sm text-muted-foreground dark:text-muted-foreground">+0.2 this month</div>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Collateral Deposit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-2xl font-bold">10 WETH</div>
                                            <TrendingUpIcon className="h-5 w-5 text-green-500" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-2xl font-bold">5 WBTC</div>
                                            <TrendingDownIcon className="h-5 w-5 text-red-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select coin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="total">Total</SelectItem>
                                                <SelectItem value="weth">WETH</SelectItem>
                                                <SelectItem value="wbtc">WBTC</SelectItem>
                                                <SelectItem value="link">LINK</SelectItem>
                                                <SelectItem value="dai">DAI</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {selectedCoin === "total" && <div className="text-2xl font-bold">$50,000</div>}
                                        {selectedCoin === "weth" && <div className="text-2xl font-bold">$30,000</div>}
                                        {selectedCoin === "wbtc" && <div className="text-2xl font-bold">$20,000</div>}
                                        {selectedCoin === "link" && <div className="text-2xl font-bold">$10,000</div>}
                                        {selectedCoin === "dai" && <div className="text-2xl font-bold">$5,000</div>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Borrow History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>0x123...abc</TableCell>
                                            <TableCell>$10,000</TableCell>
                                            <TableCell>2023-04-01</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">Active</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>0x456...def</TableCell>
                                            <TableCell>$5,000</TableCell>
                                            <TableCell>2023-03-15</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Repaid</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>0x789...ghi</TableCell>
                                            <TableCell>$15,000</TableCell>
                                            <TableCell>2023-02-28</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Liquidated</Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="dark:bg-background dark:border-neutral-800">
                            <CardHeader>
                                <CardTitle>Repay History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>0x123...abc</TableCell>
                                            <TableCell>$10,000</TableCell>
                                            <TableCell>2023-04-01</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">Active</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>0x456...def</TableCell>
                                            <TableCell>$5,000</TableCell>
                                            <TableCell>2023-03-15</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Repaid</Badge>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>0x789...ghi</TableCell>
                                            <TableCell>$15,000</TableCell>
                                            <TableCell>2023-02-28</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">Liquidated</Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}

// function BookmarkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
//         </svg>
//     )
// }


// function DeleteIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
//             <line x1="18" x2="12" y1="9" y2="15" />
//             <line x1="12" x2="18" y1="9" y2="15" />
//         </svg>
//     )
// }


// function GhostIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M9 10h.01" />
//             <path d="M15 10h.01" />
//             <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
//         </svg>
//     )
// }


// function HandHelpingIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
//             <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
//             <path d="m2 13 6 6" />
//         </svg>
//     )
// }


// function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//             <polyline points="9 22 9 12 15 12 15 22" />
//         </svg>
//     )
// }


// function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <line x1="4" x2="20" y1="12" y2="12" />
//             <line x1="4" x2="20" y1="6" y2="6" />
//             <line x1="4" x2="20" y1="18" y2="18" />
//         </svg>
//     )
// }


// function ReceiptIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
//             <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
//             <path d="M12 17.5v-11" />
//         </svg>
//     )
// }


// function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <circle cx="11" cy="11" r="8" />
//             <path d="m21 21-4.3-4.3" />
//         </svg>
//     )
// }


// function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//             <circle cx="12" cy="12" r="3" />
//         </svg>
//     )
// }


// function TrendingDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
//             <polyline points="16 17 22 17 22 11" />
//         </svg>
//     )
// }


// function TrendingUpIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
//             <polyline points="16 7 22 7 22 13" />
//         </svg>
//     )
// }


// function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//     return (
//         <svg
//             {...props}
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//         >
//             <path d="M18 6 6 18" />
//             <path d="m6 6 12 12" />
//         </svg>
//     )
// }