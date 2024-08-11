import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Location } from '@/types/location';

import { cn } from '@/lib/utils';
import { Archive, MapPin, MapPinCheck, PencilLine } from 'lucide-react';

const statusVariants = cva(
    'inline-flex items-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors w-[8em] select-none px-1 h-fit',
    {
        variants: {
            variant: {
                active: 'border-green-500 text-green-500 border',
                archived: 'border-gray-500 text-gray-500 border',
                draft: 'border-purple-500 text-purple-500 border',
                visited: 'border-rose-500 text-rose-500 border',
            },
        },
    },
);

const variantIcons = {
    active: MapPin,
    archived: Archive,
    draft: PencilLine,
    visited: MapPinCheck,
};

export interface StatusProps extends React.HTMLAttributes<HTMLElement> {
    variant: Location['status'];
}

const Status = ({ className, variant, ...props }: StatusProps) => {
    const Icon = variantIcons[variant];
    return (
        <div className={cn(statusVariants({ variant }), className)} {...props}>
            <Icon className="mr-2 h-[1em] min-w-[1em] w-[1em]" />
            <div className="overflow-x-hidden flex-grow text-center pr-[0.5em]">{variant?.toUpperCase()}</div>
        </div>
    );
};
Status.displayName = 'Status';

export { Status, statusVariants };
