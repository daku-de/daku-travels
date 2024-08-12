'use client';

import { Status } from '@/components/ui/status';
import { StatusValues } from '@/types/location';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function StatusDropDown({ onStatusChange }: { onStatusChange: (status: StatusValues) => void }) {
    const [status, setStatus] = useState(StatusValues.active);

    const statuses = Object.values(StatusValues);

    const handleStatusChange = (s: StatusValues) => {
        setStatus(s);
        onStatusChange(s);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                <div className="flex flex-row items-center gap-1 p-2 w-fit rounded-lg bg-background">
                    <Status variant={status} />
                    <ChevronDown className="h-4 w-4" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                {statuses.map((s) => (
                    <DropdownMenuItem
                        key={s}
                        className="hover:cursor-pointer"
                        onClick={() => {
                            handleStatusChange(s);
                        }}
                    >
                        <Status variant={s} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
