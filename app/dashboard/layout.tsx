import type { Metadata } from 'next';
import Link from 'next/link';
import { FilePenLine, Home, LineChart, Package2, PanelLeft, TentTree } from 'lucide-react';

import { DashboardBreadcrumb } from '@/components/ui/dashboardBreadcrumb';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';

import { VercelLogo } from '@/components/icons';
import { FaGithub } from 'react-icons/fa';
import ThemeSwitch from './theme-switcher';

export const metadata: Metadata = {
    title: "Dashboard | DAKU'S TRAVELS",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <main className="flex min-h-screen w-full flex-col bg-muted/40" id="root">
                <DesktopNav />
                <div className="flex flex-col sm:gap-4 sm:pt-4 sm:pl-14 h-dvh">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <MobileNav />
                        <DashboardBreadcrumb />
                        <SearchInput />
                        <ThemeSwitch className="text-muted-foreground hover:text-foreground flex sm:hidden" />
                        <User />
                    </header>
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                        {children}
                    </main>
                </div>
            </main>
        </Providers>
    );
}

function DesktopNav() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="/"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <VercelLogo className="h-3 w-3 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </Link>

                <NavItem href="/dashboard" label="Dashboard">
                    <Home className="h-5 w-5" />
                </NavItem>

                <NavItem href="/" label="Frontend">
                    <TentTree className="h-5 w-5" />
                </NavItem>

                <NavItem href="/dashboard/edit" label="Edit Location">
                    <FilePenLine className="h-5 w-5" />
                </NavItem>

                <NavItem href="/dashboard/analytics" label="Analytics">
                    <LineChart className="h-5 w-5" />
                </NavItem>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <ThemeSwitch className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <NavItem href="https://github.com/daku-de/daku-travels" target="_blank" label="View Repository">
                    <FaGithub className="h-5 w-5" />
                </NavItem>
            </nav>
        </aside>
    );
}

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <SheetClose asChild>
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Vercel</span>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            href="/"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <TentTree className="h-5 w-5" />
                            Frontend
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            href="/dashboard/edit"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <FilePenLine className="h-5 w-5" />
                            Edit Location
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            href="/dashboard/analytics"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="h-5 w-5" />
                            Analytics
                        </Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link
                            href="https://github.com/daku-de/daku-travels"
                            target="_blank"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <FaGithub className="h-5 w-5" />
                            Repository
                        </Link>
                    </SheetClose>
                </nav>
            </SheetContent>
        </Sheet>
    );
}
