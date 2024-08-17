import React from 'react';
import { deleteTravel } from '@/actions/actions';
import { Travel } from '@/types/location';
import DeleteModal from './deleteModal';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    travel: Travel;
}

const DeleteTravelModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, travel }) => {
    const onDelete = () => {
        deleteTravel(travel);
        window.location.reload();
    };

    return (
        <React.Fragment>
            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                header={`Delete Travel "${travel.destination.name + ' ' + travel.year}"`}
                type={'travel'}
                deleteFunction={onDelete}
            ></DeleteModal>
        </React.Fragment>
    );
};

export default DeleteTravelModal;
