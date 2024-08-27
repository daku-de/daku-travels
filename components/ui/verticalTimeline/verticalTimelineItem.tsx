import * as React from 'react';

import { cn } from '@/lib/utils';
import { Ellipsis, LucideIcon, MapPin } from 'lucide-react';
import { IconType } from 'react-icons/lib';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';
import { useEffect, useState } from 'react';
import { Country } from '@/types/location';
import Image from 'next/image';

interface VerticalTimelineItemProps extends React.HTMLAttributes<HTMLElement> {
    Icon: LucideIcon | IconType | null;
    iconColor: string;
    country: Country;
    location: string;
    info: React.ReactNode;
    onDelete: () => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const VerticalTimelineItem = ({
    className,
    location,
    info,
    Icon,
    iconColor,
    country,
    onMouseLeave,
    onMouseEnter,
    onDelete,
    ...props
}: VerticalTimelineItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [flagError, setFlagError] = useState<boolean>(false);

    useEffect(() => {
        setFlagError(false);
    }, [country]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onMouseEnter();
        if (!open) {
            onMouseLeave();
        }
    };
    const handleMouseLeave = () => {
        if (isOpen) {
            return;
        } else {
            onMouseLeave();
        }
    };
    return (
        <div className={cn('min-h-28 relative pl-10', className)} {...props}>
            <div
                className={`absolute top-2 left-1 rounded-full w-[34px] h-[34px] border-muted border-4 -translate-x-1/2 text-primary-foreground overflow-hidden`}
            >
                <VerticalTimelineIcon
                    selectedColor={iconColor}
                    country={country}
                    className={`h-full w-full border-0 absolute ${iconColor !== 'flag' ? iconColor : 'bg-primary'}`}
                />
                {Icon ? <Icon className="w-full h-full absolute p-1" /> : <></>}
            </div>
            <div
                className="min-h-28 max-w-[100%] w-96 bg-card relative rounded-xl p-3 flex justify-between flex-col shadow-md border"
                onMouseEnter={onMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="absolute right-0 top-0 m-2">
                    <DropdownMenu onOpenChange={handleOpenChange}>
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
                <div className="pr-8">
                    <div className="inline-flex items-center">
                        <MapPin className="h-[1em]" />
                        <div>{location}</div>
                    </div>
                </div>

                <div className="flex text-primary/40 text-sm text-ellipsis max-[345px]:text-xs">{info}</div>
            </div>
        </div>
    );
};
VerticalTimelineItem.displayName = 'VerticalTimelineItem';

export const VerticalTimelineIcon = ({
    selectedColor,
    country,
    className,
}: {
    selectedColor: string;
    country: Country | null;
    className?: string;
}) => {
    const [flagError, setFlagError] = useState<boolean>(false);
    useEffect(() => {
        setFlagError(false);
    }, [country]);
    return (
        <div
            className={cn(
                `h-8 w-8 ${selectedColor === 'flag' ? 'bg-muted' : selectedColor} rounded-full flex justify-center items-center border border-foreground/50 shadow-lg overflow-hidden relative`,
                className,
            )}
        >
            <div className="text-[8px] text-center text-muted-foreground w-full flex justify-center flex-shrink-0">
                {selectedColor === 'flag' ? (flagError ? 'ERR' : country ? '' : 'FLAG') : ''}
            </div>
            {selectedColor === 'flag' && country && !flagError ? (
                <Image
                    alt={`Flag of ${country.name}`}
                    className="object-cover flex-none h-full w-full absolute top-0 left-0"
                    height="48"
                    src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                    width="64"
                    onError={() => {
                        setFlagError(true);
                    }}
                />
            ) : (
                <div className={` shadow-lg ${selectedColor} w-full h-full hover:cursor-pointer`}></div>
            )}
        </div>
    );
};

export { VerticalTimelineItem };
