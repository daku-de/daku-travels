'use client';

import { useEffect, useRef, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

import { Country } from '@/types/location';
import { loadCountries } from '@/actions/actions';

export default function CountryDropdown({
    onCountryChange,
    error,
}: {
    onCountryChange: (c: Country) => void;
    error: boolean;
}) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [countryList, setCountryList] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
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
    }, []);

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        setFlagError(false);
        onCountryChange(country);
    };

    const filteredCountries = countryList.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleInputBlur = () => {
        if (searchInputRef?.current && filteredCountries.length > 1) {
            searchInputRef.current.focus();
        }
    };

    const handleDropdownOpen = () => {
        setSearchTerm('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (filteredCountries.length > 0) {
                handleCountryChange(filteredCountries[0]);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const inputEvent = e.nativeEvent as InputEvent;

        if (inputEvent.inputType === 'deleteContentBackward') {
            setSearchTerm('');
        } else {
            setSearchTerm(value);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="text-xs text-foreground/50 px-1">Country</div>
            <div className="flex flex-row gap-2 items-center">
                <DropdownMenu onOpenChange={handleDropdownOpen}>
                    <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                        <div
                            className={`flex flex-row items-center gap-1 p-2 w-fit rounded-lg bg-background border ${error ? 'border-red-600 text-red-600' : ''}`}
                        >
                            <div className="w-[7em] text-ellipsis overflow-hidden whitespace-nowrap">
                                {selectedCountry ? selectedCountry.name : 'Select a country'}
                            </div>
                            <ChevronDown className="h-4 w-4 text-foreground" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="center"
                        className="w-40 max-h-80 overflow-y-auto scrollbar-hide z-[10000]"
                    >
                        <input
                            type="text"
                            placeholder="Search country"
                            ref={searchInputRef}
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-0 h-0 absolute"
                            autoFocus
                            onBlur={handleInputBlur}
                        />
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <DropdownMenuItem
                                    key={country.id}
                                    className="hover:cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden block hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => handleCountryChange(country)}
                                >
                                    {country.name}
                                </DropdownMenuItem>
                            ))
                        ) : (
                            <div className="px-2 py-1 text-sm text-muted-foreground">No countries found</div>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
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
        </div>
    );
}
