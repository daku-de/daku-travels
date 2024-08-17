import React, { HTMLAttributes } from 'react';
import CustomModal from '../modal';
import { Button } from '@/components/ui/button';

interface DeleteModalProps extends HTMLAttributes<HTMLElement> {
    isOpen: boolean;
    closeModal: () => void;
    type: string;
    header: string;
    deleteFunction: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, header, type, children, deleteFunction }) => {
    const onDelete = () => {
        closeModal();
        deleteFunction();
    };

    return (
        <React.Fragment>
            <CustomModal isOpen={isOpen} onRequestClose={closeModal} header={header}>
                <div className="min-h-16">{children}</div>
                <div className="w-full border-t border-foreground/30 p-4">
                    <Button variant={'destructive'} className="h-8 w-full" onClick={onDelete}>
                        I want to delete this {type}
                    </Button>
                </div>
            </CustomModal>
        </React.Fragment>
    );
};

export default DeleteModal;
