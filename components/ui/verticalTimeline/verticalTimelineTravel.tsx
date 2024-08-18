import * as React from 'react';
import { Travel } from '@/types/location';
import { Clock, Plane, PlaneTakeoff } from 'lucide-react';
import { VerticalTimelineItem } from './verticalTimelineItem';
import DeleteTravelModal from '@/app/dashboard/modals/deleteModal/deleteTravelModal';
import { useState } from 'react';

interface VerticalTimelineItemProps extends React.HTMLAttributes<HTMLElement> {
    travel: Travel;
}

function getMonthAbbreviation(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'short' });
}

function getDurationString(days: number) {
    if (days === 1) return days + ' day';
    return days + ' days';
}

const VerticalTimelineTravel = ({ className, travel }: VerticalTimelineItemProps) => {
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
                Icon={Plane}
                iconColor={'bg-tertiary'}
                location={travel.destination.name}
                className={className}
                info={date}
                onDelete={openModal}
            />
            <DeleteTravelModal travel={travel} isOpen={modalIsOpen} closeModal={closeModal} />
        </>
    );
};

export { VerticalTimelineTravel };
