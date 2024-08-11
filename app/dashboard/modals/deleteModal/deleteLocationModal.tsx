import React from 'react';
import CustomModal from '../modal';
import { Button } from '@/components/ui/button';
import { deleteLocation } from '@/actions/actions';
import { Location } from '@/types/location';
import Image from 'next/image';
import { Status } from '@/components/ui/status';
import { Calendar } from 'lucide-react';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    location: Location;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, location }) => {
    const onDelete = () => {
        deleteLocation(location);
        closeModal();
        window.location.reload();
    };

    return (
        <React.Fragment>
            <CustomModal
                isOpen={isOpen}
                onRequestClose={closeModal}
                header={`Delete "${location.country.code.toLowerCase() + '/' + location.name}"`}
            >
                <div className="max-w-[80%] flex flex-col items-center p-4 mx-auto">
                    <Image
                        alt={`Flag of ${location.country.code}`}
                        className="aspect-square rounded-xl object-cover mb-2"
                        height="32"
                        src={`https://flagcdn.com/${location.country.code.toLowerCase()}.svg`}
                        width="32"
                    />
                    <div className="font-bold text-xl">
                        {location.country.name.toLowerCase().replace(' ', '-')}/{location.name}
                    </div>
                    <div className="text-center line-clamp-2 mb-3">{location.shortDescription}</div>
                    <div className="flex gap-4 items-center">
                        <Status variant={location.status} />
                        <div className="inline-flex items-center gap-1 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4 flex-none" />
                            {new Date(Number(location.id)).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-foreground/30 p-4">
                    <Button variant={'destructive'} className="h-8 w-full" onClick={onDelete}>
                        I want to delete this location
                    </Button>
                </div>
            </CustomModal>
        </React.Fragment>
    );
};

export default DeleteModal;
