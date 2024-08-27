import React, { HTMLAttributes } from 'react';
import CustomModal from '../modal';
import { Button } from '@/components/ui/button';

interface DeleteModalProps extends HTMLAttributes<HTMLElement> {
    isOpen: boolean;
    closeModal: () => void;
    header: string;
    createFunction: () => void;
}

const CreateModal: React.FC<DeleteModalProps> = ({ isOpen, closeModal, header, children, createFunction }) => {
    const handleCreate = () => {
        createFunction();
    };

    return (
        <React.Fragment>
            <CustomModal isOpen={isOpen} onRequestClose={closeModal} header={header}>
                <div className="min-h-16">{children}</div>
                <div className="w-full border-t border-foreground/30 p-4">
                    <Button variant={'default'} className="h-8 w-full" onClick={handleCreate}>
                        Create
                    </Button>
                </div>
            </CustomModal>
        </React.Fragment>
    );
};

export default CreateModal;
