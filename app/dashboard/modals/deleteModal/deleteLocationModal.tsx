import React from 'react';
import { deleteLocation } from '@/actions/actions';
import { Location } from '@/types/location';
import Image from 'next/image';
import { Status } from '@/components/ui/status';
import { Calendar } from 'lucide-react';
import DeleteModal from './deleteModal';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    location: Location;
}

const DeleteLocationModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, location }) => {
    const onDelete = () => {
        deleteLocation(location);
        window.location.reload();
    };

    return (
        <React.Fragment>
            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                header={`Delete "${location.country.code.toLowerCase() + '/' + location.name}"`}
                type={'location'}
                deleteFunction={onDelete}
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
                        {location.country.code.toLowerCase().replace(' ', '-')}/{location.name}
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
            </DeleteModal>
        </React.Fragment>
    );
};

export default DeleteLocationModal;
