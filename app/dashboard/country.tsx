import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { Country } from '@/types/country';
import DeleteModalButton from './modals/deleteModal/deleteModalButton';
import EditModalButton from './modals/editModal/editModalButton';
import { Status } from '@/components/ui/status';

export function CountryEntry({ country }: { country: Country }) {
    return (
        <TableRow>
            <TableCell className="hidden sm:table-cell">
                <Image
                    alt={`Flag of ${country.countrycode}`}
                    className="aspect-square rounded-xl object-cover"
                    height="48"
                    src={`https://flagcdn.com/${country.countrycode}.svg`}
                    width="48"
                />
            </TableCell>
            <TableCell className="font-medium">{country.name}</TableCell>
            <TableCell>
                <Badge
                    variant="outline"
                    className="capitalize h-6 w-10 shadow-md"
                    style={{ background: country.color }}
                />
            </TableCell>
            <TableCell className="hidden md:table-cell">{`${country.shortDescription}`}</TableCell>
            <TableCell className="hidden md:table-cell">
                <Status variant={country.status} />
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {new Date(Number(country.id)).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                })}
            </TableCell>
            <TableCell>
                <div className="flex flex-row gap-2">
                    <EditModalButton country={country} />
                    <DeleteModalButton country={country} />
                </div>
            </TableCell>
        </TableRow>
    );
}
