import * as React from 'react';
import { iconMap, Travel } from '@/types/location';
import { Clock, Plane, PlaneTakeoff } from 'lucide-react';
import { VerticalTimelineItem } from './verticalTimelineItem';
import DeleteTravelModal from '@/app/dashboard/modals/deleteModal/deleteTravelModal';
import { useState } from 'react';
import { FaBicycle, FaCarSide, FaPlane, FaShip, FaTrain, FaWalking } from 'react-icons/fa';

interface VerticalTimelineItemProps extends React.HTMLAttributes<HTMLElement> {
    travel: Travel;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onDelete: () => void;
}

export function getMonthAbbreviation(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'short' });
}

export function getDurationString(days: number) {
    if (days === 1) return days + ' day';
    return days + ' days';
}

const VerticalTimelineTravel = ({
    className,
    travel,
    onMouseEnter,
    onMouseLeave,
    onDelete,
}: VerticalTimelineItemProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const date = (
        <div className="inline-flex gap-4 max-[330px]:w-full max-[330px]:gap-1 max-[330px]:justify-between items-center">
            <div className="inline-flex gap-2 items-center">
                <PlaneTakeoff className="h-[1.3em]" />
                <div>
                    {getMonthAbbreviation(travel.month)} {travel.year}
                </div>
            </div>
            <div>•</div>
            <div className="inline-flex gap-2 items-center">
                <Clock className="h-[1.3em]" />
                <div>{getDurationString(travel.duration)}</div>
            </div>
        </div>
    );

    return (
        <>
            <VerticalTimelineItem
                Icon={iconMap['travel'][travel.icon]}
                iconColor={travel.color}
                country={travel.destination}
                location={travel.destination.name}
                className={className}
                info={date}
                onDelete={openModal}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            <DeleteTravelModal travel={travel} isOpen={modalIsOpen} closeModal={closeModal} onDelete={onDelete} />
        </>
    );
};

export { VerticalTimelineTravel };
