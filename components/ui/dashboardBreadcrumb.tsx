'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { loadLocations } from '@/actions/database-actions';

interface BreadcrumbItemValue {
    href: string;
    label: string;
}

export function DashboardBreadcrumb() {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemValue[]>([]);
    const currentPath = usePathname();

    const breadcrumbMap: { [key: string]: BreadcrumbItemValue[] } = {
        '/dashboard': [{ href: '/dashboard', label: 'Dashboard' }],
        '/dashboard/analytics': [
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/dashboard/analytics', label: 'Analytics' },
        ],
        '/dashboard/edit': [
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/dashboard/edit', label: 'Edit' },
        ],
        '/dashboard/edit/[id]': [
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/dashboard/edit', label: 'Edit' },
            { href: '/dashboard/edit/[id]', label: '[id]' },
        ],
        '/dashboard/timeline': [
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/dashboard/timeline', label: 'Timeline' },
        ],
    };

    const getBreadcrumbs = async (path: string): Promise<BreadcrumbItemValue[]> => {
        const pathSegments = path.split('/');
        const matchedKey = Object.keys(breadcrumbMap).find((key) => {
            const keySegments = key.split('/');
            if (keySegments.length !== pathSegments.length) return false;

            return keySegments.every((segment, index) => segment === '[id]' || segment === pathSegments[index]);
        });

        if (matchedKey) {
            let breadcrumbs = [...breadcrumbMap[matchedKey]];

            if (matchedKey.includes('[id]')) {
                const id = pathSegments[pathSegments.length - 1];
                const locations = await loadLocations();
                const name = locations.find((l) => l.id === id)?.name || 'Unknown';

                breadcrumbs = breadcrumbs.map((breadcrumb) => ({
                    ...breadcrumb,
                    href: breadcrumb.href.replace('[id]', id),
                    label: breadcrumb.href.includes('[id]') ? name : breadcrumb.label,
                }));
            }

            return breadcrumbs;
        }

        return [];
    };

    useEffect(() => {
        const fetchData = async () => {
            setBreadcrumbs([]);

            const newBreadcrumbs = await getBreadcrumbs(currentPath);
            setBreadcrumbs(newBreadcrumbs);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath]);

    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
