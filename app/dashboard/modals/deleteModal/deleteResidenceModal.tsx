import React from 'react';
import { deleteResidencePeriod } from '@/actions/actions';
import { ResidencePeriod } from '@/types/location';
import DeleteModal from './deleteModal';

interface DeleteModalProps {
    isOpen: boolean;
    closeModal: () => void;
    residence: ResidencePeriod;
}

const DeleteResidenceModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, residence }) => {
    const onDelete = () => {
        deleteResidencePeriod(residence);
        window.location.reload();
    };

    return (
        <React.Fragment>
            <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                header={`Delete Residence "${residence.city + ' ' + residence.startYear}"`}
                type={'residence'}
                deleteFunction={onDelete}
            ></DeleteModal>
        </React.Fragment>
    );
};

export default DeleteResidenceModal;
