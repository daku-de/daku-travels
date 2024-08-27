import React from 'react';
import { deleteTravel } from '@/actions/database-actions';
import { Travel } from '@/types/location';
import DeleteModal from './deleteModal';

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
            ></DeleteModal>
        </React.Fragment>
    );
};

export default DeleteTravelModal;
