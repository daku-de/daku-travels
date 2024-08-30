import React from 'react';
import { deleteTravel } from '@/actions/database-actions';
import { Travel } from '@/types/location';
import DeleteModal from './deleteModal';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { getDurationString, getMonthAbbreviation } from '@/components/ui/verticalTimeline/verticalTimelineTravel';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    travel: Travel;
    onDelete: () => void;
}

const DeleteTravelModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, travel, onDelete }) => {
    const handleDelete = () => {
        deleteTravel(travel);
        onDelete();
    };

    return (
        <React.Fragment>
            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                header={`Delete Travel "${travel.destination.name + ' ' + travel.year}"`}
                type={'travel'}
                deleteFunction={handleDelete}
            >
                <div className="max-w-[80%] flex flex-col items-center p-4 mx-auto">
                    <Image
                        alt={`Flag of ${travel.destination.name}`}
                        className="aspect-square rounded-xl object-cover mb-2"
                        height="32"
                        src={`https://flagcdn.com/${travel.destination.code.toLowerCase()}.svg`}
                        width="32"
                    />
                    <div className="font-bold text-xl">
                        {travel.destination.code.toLowerCase().replace(' ', '-')}/{travel.destination.name}
                    </div>
                    <div className="text-center line-clamp-2 mb-3">{'PLACEHOLDER'}</div>
                    <div className="flex gap-4 items-center text-gray-500 text-sm">
                        <div className="inline-flex gap-1 items-center">
                            <Clock className="w-4 h-4 flex-none" />
                            <div>{getDurationString(travel.duration)}</div>
                        </div>
                        <div className="inline-flex items-center gap-1 ">
                            <Calendar className="w-4 h-4 flex-none" />
                            <div>
                                {getMonthAbbreviation(travel.month)} {travel.year}
                            </div>
                        </div>
                    </div>
                </div>
            </DeleteModal>
        </React.Fragment>
    );
};

export default DeleteTravelModal;
