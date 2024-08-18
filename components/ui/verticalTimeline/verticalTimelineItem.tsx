import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ellipsis, LucideIcon, MapPin, Trash2 } from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';

interface VerticalTimelineItemProps extends React.HTMLAttributes<HTMLElement> {
    Icon?: LucideIcon | IconType;
    iconColor?: string;
    location: string;
    info: React.ReactNode;
    onDelete: () => void;
}

const VerticalTimelineItem = ({
    className,
    location,
    info,
    Icon,
    iconColor,
    onDelete,
    ...props
}: VerticalTimelineItemProps) => {
    return (
        <div className={cn('min-h-28 relative pl-10', className)} {...props}>
            <div
                className={`absolute top-2 left-1 ${iconColor ? iconColor : 'bg-primary'} rounded-full w-8 h-8 border-muted border-4 -translate-x-1/2 p-1 text-primary-foreground`}
            >
                {Icon ? <Icon className="fill-primary-foreground w-full h-full" /> : <></>}
            </div>
            <div className="min-h-20 max-w-[95%] w-96 box-content bg-card relative rounded-xl p-3 flex justify-between flex-col shadow-md border">
                {/* <div
                    className="absolute right-0 top-0 m-2 p-1 bg-destructive rounded-lg cursor-pointer text-destructive-foreground hover:bg-destructive/70"
                    onClick={onDelete}
                >
                    <Trash2 className="w-4 h-4" />
                </div> */}
                <div className="absolute right-0 top-0 m-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="p-1">
                                <Ellipsis className="h-4 w-4" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="h-0 w-0 absolute top-0 left-0 -translate-x-full border-[12px] border-transparent border-solid border-r-card border-l-0 mt-3 text-card"></div>
                <div>
                    <div className="inline-flex items-center">
                        <MapPin className="h-[1em]" />
                        <div>{location}</div>
                    </div>
                </div>

                <div className="flex text-primary/40 text-sm text-ellipsis">{info}</div>
            </div>
        </div>
    );
};
VerticalTimelineItem.displayName = 'VerticalTimelineItem';

export { VerticalTimelineItem };
