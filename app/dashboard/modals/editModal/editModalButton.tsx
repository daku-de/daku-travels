import React from 'react';
import { Location } from '@/types/location';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

interface DeleteButtonProps {
    location: Location;
}

const EditModalButton: React.FC<DeleteButtonProps> = ({ location }) => {
    return (
        <React.Fragment>
            <Link
                href={`/dashboard/edit/${location.id}`}
                className="inline-flex w-fit items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-tertiary text-white hover:bg-tertiary/70 h-10 px-4 py-2"
            >
                <Pencil className="h-5 w-5" />
            </Link>
        </React.Fragment>
    );
};

export default EditModalButton;
