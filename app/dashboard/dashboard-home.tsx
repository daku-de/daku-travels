'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CountriesTable } from './countries-table';
import { loadCountries } from '@/actions/actions';
import { useEffect, useState } from 'react';
import { Country } from '@/types/country';

export default function DashboardHome() {
    const [countries, setCountries] = useState<Country[]>([]);
    useEffect(() => {
        const fetchCountries = async () => {
            setCountries(await loadCountries());
        };
        fetchCountries();
    }, []);

    const handleExport = () => {
        const countryData = JSON.stringify(countries, null, 2);
        const blob = new Blob([countryData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'countries.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archived
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
                    </Button>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Location</span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <CountriesTable
                    countries={countries}
                    title="All Locations"
                    description="Manage and update all locations."
                />
            </TabsContent>
            <TabsContent value="active">
                <CountriesTable
                    countries={countries.filter((c) => c.status === 'active')}
                    title="Active Locations"
                    description="These locations are currently visible to users on the front page."
                />
            </TabsContent>
            <TabsContent value="draft">
                <CountriesTable
                    countries={countries.filter((c) => c.status === 'draft')}
                    title="Location Drafts"
                    description="Locations saved as drafts. These locations can be incomplete and are not visible."
                />
            </TabsContent>
            <TabsContent value="archived">
                <CountriesTable
                    countries={countries.filter((c) => c.status === 'archived')}
                    title="Archived Locations"
                    description="These locations are archived and no longer active."
                />
            </TabsContent>
        </Tabs>
    );
}
