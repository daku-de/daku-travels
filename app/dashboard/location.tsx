import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Location } from '@/types/location';
import DeleteModalButton from './modals/deleteModal/deleteModalButton';
import EditModalButton from './modals/editModal/editModalButton';
import { Status } from '@/components/ui/status';

export function LocationEntry({ location }: { location: Location }) {
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Image
                    alt={`Flag of ${location.country.code}`}
                    className="aspect-square rounded-xl object-cover flex-none"
                    height="48"
                    src={`https://flagcdn.com/${location.country.code.toLowerCase()}.svg`}
                    width="48"
                />
            </TableCell>
            <TableCell className="font-medium">{location.name}</TableCell>
            <TableCell className="hidden min-[900px]:table-cell">
                <Badge
                    variant="outline"
                    className="capitalize h-6 w-10 shadow-md"
                    style={{ background: location.color }}
                />
            </TableCell>
            <TableCell className="hidden md:table-cell">{`${location.shortDescription}`}</TableCell>
            <TableCell className="hidden min-[370px]:table-cell">
                <Status variant={location.status} className="min-[460px]:text-base text-[0.6rem]" />
            </TableCell>
            <TableCell className="hidden min-[900px]:table-cell">
                {location.createdAt.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
            </TableCell>
            <TableCell>
                <div className="flex sm:flex-row gap-2 flex-col">
                    <EditModalButton location={location} />
                    <DeleteModalButton location={location} />
                </div>
            </TableCell>
        </TableRow>
    );
}
