'use client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React from 'react';
import Modal, { Styles } from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 1000 },
};

Modal.setAppElement('#root');

interface CustomModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    customStyles?: Styles;
    header?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, header, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Custom Modal"
            style={customStyles}
            className={'flex flex-col z-50 absolute bg-card border rounded-xl w-[480px] max-w-[85%]'}
        >
            <div className="w-full border-b border-black/30 flex justify-between items-center p-2 px-3">
                <div className="font-semibold">{header}</div>
                <Button variant="ghost" onClick={onRequestClose} className="p-2 h-auto">
                    <X className="w-4 h-4" />
                </Button>
            </div>
            <div>{children}</div>
        </Modal>
    );
};

export default CustomModal;
