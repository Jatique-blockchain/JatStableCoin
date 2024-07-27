import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/components/dashboard/sidebar";
import { Bricolage_Grotesque } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from "./header";
import Sidebar from "./sidebar";


const fontHeading = Bricolage_Grotesque({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-heading',
})

const fontBody = Space_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
    weight: "400"
})
export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className={cn(
            'antialiased',
            fontHeading.variable,
            fontBody.variable
        )}>

            <div className="flex flex-col mt-4 ">
                <div className='md:ml-12'>
                    <Header />

                </div>
                <div className="flex flex-col md:flex-row">
                    <Sidebar />


                    <div className="w-full md:ml-8 gap-4 p-2 md:p-8 ">{children}</div>
                </div>
            </div>

            <Toaster richColors />
        </main>
    );
}
