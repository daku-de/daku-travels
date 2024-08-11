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

interface CountryResponse {
    name: {
        common: string;
        official: string;
    };
    cca2: string;
}

export default function CountryDropdown({ onCountryChange }: { onCountryChange: (c: Country) => void }) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [countryList, setCountryList] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country>({ name: 'Germany', code: 'DE' });
    const searchInputRef = useRef<HTMLInputElement>(null);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
            if (!response.ok) {
                throw new Error('Restcountries API response is not ok');
            }
            const countries: CountryResponse[] = await response.json();

            const countryList: Country[] = countries.map((country) => ({
                name: country.name.common,
                code: country.cca2,
            }));

            countryList.sort((a, b) => (a.name < b.name ? -1 : 1));

            setCountryList(countryList);
        } catch (error) {
            console.error('Error fetching country list:', error);
        }
    };

    fetchCountries();

    const handleCountryChange = (country: Country) => {
        setSelectedCountry(country);
        if (onCountryChange) {
            onCountryChange(country);
        }
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
        <div className="flex flex-row gap-2 items-center">
            <DropdownMenu onOpenChange={handleDropdownOpen}>
                <DropdownMenuTrigger asChild className="hover:cursor-pointer">
                    <div className="flex flex-row items-center gap-1 p-2 w-fit rounded-lg bg-background">
                        <div className="w-[7em] text-ellipsis overflow-hidden whitespace-nowrap">
                            {selectedCountry.name}
                        </div>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-40 max-h-96 overflow-y-auto scrollbar-hide">
                    <input
                        type="text"
                        placeholder="Search country"
                        ref={searchInputRef}
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="w-0 h-0 absolute"
                        autoFocus
                        onBlur={handleInputBlur}
                    />
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                            <DropdownMenuItem
                                key={country.code}
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
            <Image
                alt={`Flag of ${selectedCountry.name}`}
                className="rounded-xl object-cover flex-none h-12 w-16"
                height="48"
                src={`https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`}
                width="64"
            />
        </div>
    );
}
