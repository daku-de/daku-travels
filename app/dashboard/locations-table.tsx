'use client';

import { TableHead, TableRow, TableHeader, TableBody, Table } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LocationEntry } from './location';
import { Location } from '@/types/location';

export function LocationsTable({
    locations,
    title,
    description,
}: {
    locations: Location[];
    title: string;
    description: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden min-[900px]:table-cell">Color</TableHead>
                            <TableHead className="hidden md:table-cell">Short Description</TableHead>
                            <TableHead className="hidden min-[370px]:table-cell">Status</TableHead>
                            <TableHead className="hidden min-[900px]:table-cell">Created at</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {locations.map((location) => (
                            <LocationEntry key={location.id} location={location} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
