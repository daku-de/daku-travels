'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { loadCountries } from '@/actions/actions';
import { Country, iconMap, IconName } from '@/types/location';
import { IconType } from 'react-icons/lib';

interface DropdownElement {
    id: string;
    representation: React.ReactNode;
}

interface CustomDropdownProperties extends DropdownMenuProps {
    onItemChange: (item: DropdownElement) => void;
    placeholder: React.ReactNode;
    items: DropdownElement[];
    itemsTypeName: string;
    error: boolean;
}

export function CustomDropdown({
    onItemChange,
    placeholder,
    items,
    itemsTypeName,
    error,
    onOpenChange,
}: CustomDropdownProperties) {
    const [selectedItem, setSelectedItem] = useState<DropdownElement | null>(null);

    const handleItemChange = (item: DropdownElement) => {
        setSelectedItem(item);
        onItemChange(item);
    };

    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild className="hover:cursor-pointer h-fit">
                <div
                    className={`flex flex-row items-center gap-1 p-2 w-fit rounded-lg bg-background border ${error && 'border-red-600 text-red-600'}`}
                >
                    <div className="w-[7em] text-ellipsis overflow-hidden whitespace-nowrap">
                        {selectedItem ? selectedItem.representation : placeholder}
                    </div>
                    <ChevronDown className="h-4 w-4 text-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-40 max-h-80 overflow-y-auto scrollbar-hide z-[10000]">
                {items.length > 0 ? (
                    items.map((item) => (
                        <DropdownMenuItem
                            key={item.id}
                            className="hover:cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden block"
                            onClick={() => handleItemChange(item)}
                        >
                            {item.representation}
                        </DropdownMenuItem>
                    ))
                ) : (
                    <div className="px-2 py-1 text-sm text-muted-foreground">No {itemsTypeName} found</div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface TextSearchDropdownElement extends DropdownElement {
    searchKey: string;
}

interface CustomTextSearchDropdownProps extends CustomDropdownProperties {
    items: TextSearchDropdownElement[];
}

export const TextSearchDropdown = ({
    onItemChange,
    placeholder,
    items,
    itemsTypeName,
    error,
}: CustomTextSearchDropdownProps) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredItems = items.filter((item) => item.searchKey.toLowerCase().includes(searchTerm.toLowerCase()));

    const onOpenChange = () => {
        setSearchTerm('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            setSearchTerm('');
        } else if (/^[a-z0-9]$/.test(e.key)) {
            setSearchTerm(searchTerm + e.key);
        }
    };

    return (
        <div onKeyDown={handleKeyDown}>
            <CustomDropdown
                onItemChange={onItemChange}
                placeholder={placeholder}
                items={filteredItems}
                itemsTypeName={itemsTypeName}
                error={error}
                onOpenChange={onOpenChange}
            />
        </div>
    );
};

export function CountryDropdown({
    onCountryChange,
    error,
    country,
}: {
    onCountryChange: (c: Country) => void;
    error: boolean;
    country: Country | null;
}) {
    const [countryList, setCountryList] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [flagError, setFlagError] = useState<boolean>(false);

    const fetchCountries = async () => {
        try {
            setCountryList(await loadCountries());
        } catch (error) {
            console.error('Error fetching country list:', error);
        }
    };

    useEffect(() => {
        fetchCountries();
        if (country) {
            setSelectedCountry(country);
        }
    }, []);

    const handleCountryChange = (item: DropdownElement) => {
        const country = countryList.find((country) => country.id === item.id);
        if (!country) {
            return;
        }
        setSelectedCountry(country);
        setFlagError(false);
        onCountryChange(country);
    };

    return (
        <div className="flex flex-row gap-2 items-center">
            <TextSearchDropdown
                items={countryList.map((country) => {
                    return {
                        id: country.id,
                        representation: <>{country.name}</>,
                        searchKey: country.name,
                    };
                })}
                onItemChange={handleCountryChange}
                placeholder={selectedCountry?.name || 'Select a country'}
                itemsTypeName={'countries'}
                error={error}
            />
            <div className="h-[42px] w-16 bg-muted rounded-lg relative flex justify-center items-center">
                <div className="text-xs text-center text-muted-foreground">
                    {flagError ? 'FLAG NOT FOUND' : selectedCountry ? '' : 'FLAG'}
                </div>
                {selectedCountry && !flagError && (
                    <Image
                        alt={`Flag of ${selectedCountry.name}`}
                        className="rounded-lg object-cover flex-none h-full w-full absolute top-0 left-0"
                        height="48"
                        src={`https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`}
                        width="64"
                        onError={() => {
                            setFlagError(true);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export function MonthDropdown({
    onMonthChange,
    error,
    month,
}: {
    onMonthChange: (month: number) => void;
    error: boolean;
    month: number | null;
}) {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

    const handleMonthChange = (item: DropdownElement) => {
        setSelectedMonth(parseInt(item.id));
        onMonthChange(parseInt(item.id));
    };

    const monthNames: string[] = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(2000, i);
        const monthName = date.toLocaleString('en-US', { month: 'long' });
        monthNames.push(monthName);
    }

    return (
        <TextSearchDropdown
            items={monthNames.map((month, index) => {
                return {
                    id: (index + 1).toString(),
                    representation: <>{month}</>,
                    searchKey: month,
                };
            })}
            onItemChange={handleMonthChange}
            placeholder={month ? monthNames[month - 1] : 'Select a month'}
            itemsTypeName={'months'}
            error={error}
        />
    );
}

export function YearDropdown({
    onYearChange,
    error,
    year,
}: {
    onYearChange: (year: number) => void;
    error: boolean;
    year: number;
}) {
    const [selectedYear, setSelectedYear] = useState<number>(0);

    const handleYearChange = (item: DropdownElement) => {
        setSelectedYear(parseInt(item.id));
        onYearChange(parseInt(item.id));
    };

    useEffect(() => {
        handleYearChange({
            id: year.toString(),
            representation: <>{year}</>,
        });
    }, [year]);

    const years: number[] = [];
    for (let i = 0; i < 80; i++) {
        years.push(new Date().getFullYear() - i);
    }

    return (
        <TextSearchDropdown
            items={years.map((year) => {
                return {
                    id: year.toString(),
                    representation: <>{year}</>,
                    searchKey: year.toString(),
                };
            })}
            onItemChange={handleYearChange}
            placeholder={year}
            itemsTypeName={'available years'}
            error={error}
        />
    );
}

//TODO:
function IconDropdown({
    error,
    color,
    onIconChange,
}: {
    error: boolean;
    color: string;
    onIconChange: (icon: string) => void;
}) {
    const [selectedIcon, setSelectedIcon] = useState<IconName>('none');

    const getIconWithClass = (IconComponent: IconType) => (
        <IconComponent className="w-full h-full text-primary-foreground" />
    );

    useEffect(() => {
        setSelectedIcon('none');
    }, []);

    useEffect(() => {
        if (color === 'flag') {
            setSelectedIcon('none');
        }
    }, [color]);

    useEffect(() => {
        onIconChange(selectedIcon);
    }, [selectedIcon]);

    const handleIconChange = (item: DropdownElement) => {
        setSelectedIcon(item.id as IconName);
    };
    const items: DropdownElement[] = Object.entries(iconMap['travel']).map(
        ([key, IconComponent]: [string, IconType | null]) => {
            return {
                id: key,
                representation: (
                    <div
                        className={`${color === 'flag' && key !== 'none' ? 'text-primary-foreground/30 hover:cursor-default' : 'text-primary-foreground hover:cursor-pointer'} rounded-full border border-foreground/50 shadow-lg bg-primary w-7 h-7 m-1 p-1`}
                    >
                        {IconComponent ? getIconWithClass(IconComponent) : <></>}
                    </div>
                ),
            };
        },
    );

    return (
        <CustomDropdown
            onItemChange={handleIconChange}
            placeholder={''}
            items={items}
            itemsTypeName={'icons'}
            error={error}
        />
    );
}
