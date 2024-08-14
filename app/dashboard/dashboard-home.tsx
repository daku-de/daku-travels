'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationsTable } from './locations-table';
import { loadLocations } from '@/actions/actions';
import { useEffect, useState } from 'react';
import { Location } from '@/types/location';

export default function DashboardHome() {
    const [locations, setLocations] = useState<Location[]>([]);
    useEffect(() => {
        const fetchLocations = async () => {
            setLocations(await loadLocations());
        };
        fetchLocations();
    }, []);

    const handleExport = () => {
        const locationData = JSON.stringify(locations, null, 2);
        const blob = new Blob([locationData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'locations.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all" className="hidden min-[380px]:inline-flex">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 hidden min-[380px]:inline-flex"
                        onClick={handleExport}
                    >
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
                <LocationsTable
                    locations={locations}
                    title="All Locations"
                    description="Manage and update all locations."
                />
            </TabsContent>
            <TabsContent value="active">
                <LocationsTable
                    locations={locations.filter((l) => l.status === 'active')}
                    title="Active Locations"
                    description="These locations are currently visible to users on the front page."
                />
            </TabsContent>
            <TabsContent value="draft">
                <LocationsTable
                    locations={locations.filter((l) => l.status === 'draft')}
                    title="Location Drafts"
                    description="Locations saved as drafts. These locations can be incomplete and are not visible."
                />
            </TabsContent>
            <TabsContent value="archived">
                <LocationsTable
                    locations={locations.filter((l) => l.status === 'archived')}
                    title="Archived Locations"
                    description="These locations are archived and no longer active."
                />
            </TabsContent>
        </Tabs>
    );
}
