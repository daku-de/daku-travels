'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributeAnchorTarget } from 'react';

function isActive(pathname: string, href: string): boolean {
    if (pathname === href) return true;
    if (href.startsWith('/dashboard/') && pathname.startsWith('/dashboard/')) {
        return pathname.replace('/dashboard', '').startsWith(href.replace('/dashboard', ''));
    }
    return false;
}

export function NavItem({
    href,
    label,
    children,
    target,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
    target?: HTMLAttributeAnchorTarget;
}) {
    const pathname = usePathname();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link
                    href={href}
                    target={target || '_self'}
                    className={clsx(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                        {
                            'bg-accent text-black': isActive(pathname, href),
                        },
                    )}
                >
                    {children}
                    <span className="sr-only">{label}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{label}</TooltipContent>
        </Tooltip>
    );
}
