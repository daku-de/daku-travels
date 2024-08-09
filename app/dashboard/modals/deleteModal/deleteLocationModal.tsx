import React from 'react';
import CustomModal from '../modal';
import { Button } from '@/components/ui/button';
import { deleteCountry } from '@/actions/actions';
import { Country } from '@/types/country';
import Image from 'next/image';
import { Status } from '@/components/ui/status';
import { Calendar } from 'lucide-react';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    country: Country;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, country }) => {
    const onDelete = () => {
        deleteCountry(country);
        closeModal();
        window.location.reload();
    };

    return (
        <React.Fragment>
            <CustomModal isOpen={isOpen} onRequestClose={closeModal} header={`Delete "${country.name}"`}>
                <div className="max-w-[80%] flex flex-col items-center p-4 mx-auto">
                    <Image
                        alt={`Flag of ${country.countrycode}`}
                        className="aspect-square rounded-xl object-cover mb-2"
                        height="32"
                        src={`https://flagcdn.com/${country.countrycode}.svg`}
                        width="32"
                    />
                    <div className="font-bold text-xl">
                        {country.countrycode}/{country.name}
                    </div>
                    <div className="text-center line-clamp-2 mb-3">{country.shortDescription}</div>
                    <div className="flex gap-4 ">
                        <Status variant={country.status} />
                        <div className="inline-flex items-center gap-1 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date(Number(country.id)).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-black/30 p-4">
                    <Button variant={'destructive'} className="h-8 w-full" onClick={onDelete}>
                        I want to delete this location
                    </Button>
                </div>
            </CustomModal>
        </React.Fragment>
    );
};

export default DeleteModal;
