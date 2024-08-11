import React, { useState } from 'react';
import { Location } from '@/types/location';
import DeleteModal from './deleteLocationModal';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface DeleteButtonProps {
    location: Location;
}

const DeleteModalButton: React.FC<DeleteButtonProps> = ({ location }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={openModal} variant={'destructive'} className="w-fit">
                <Eraser className="h-5 w-5" />
            </Button>
            <DeleteModal location={location} isOpen={modalIsOpen} closeModal={closeModal} />
        </React.Fragment>
    );
};

export default DeleteModalButton;
