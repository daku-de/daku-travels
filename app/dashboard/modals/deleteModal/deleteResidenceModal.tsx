import React from 'react';
import { deleteResidencePeriod } from '@/actions/database-actions';
import { ResidencePeriod } from '@/types/location';
import DeleteModal from './deleteModal';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    residence: ResidencePeriod;
    onDelete: () => void;
}

const DeleteResidenceModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, residence, onDelete }) => {
    const handleDelete = () => {
        deleteResidencePeriod(residence);
        onDelete();
    };

    return (
        <React.Fragment>
            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                header={`Delete Residence "${residence.city + ' ' + residence.startYear}"`}
                type={'residence'}
                deleteFunction={handleDelete}
            ></DeleteModal>
        </React.Fragment>
    );
};

export default DeleteResidenceModal;
