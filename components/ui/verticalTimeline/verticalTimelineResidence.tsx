import * as React from 'react';
import { iconMap, ResidencePeriod } from '@/types/location';
import { PackageOpen } from 'lucide-react';
import { VerticalTimelineItem } from './verticalTimelineItem';
import { useState } from 'react';
import DeleteResidenceModal from '@/app/dashboard/modals/deleteModal/deleteResidenceModal';
import { FaHouse } from 'react-icons/fa6';

interface VerticalTimelineItemProps extends React.HTMLAttributes<HTMLElement> {
    residencePeriod: ResidencePeriod;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onDelete: () => void;
}

function getMonthAbbreviation(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'short' });
}

const VerticalTimelineResidence = ({
    className,
    residencePeriod,
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
        <div className="inline-flex gap-5 items-center">
            <div className="inline-flex gap-1 items-center">
                <PackageOpen className="h-[1.3em]" />
                {getMonthAbbreviation(residencePeriod.startMonth)} {residencePeriod.startYear}
            </div>
            <div>-</div>
            <div>
                {residencePeriod.endMonth
                    ? getMonthAbbreviation(residencePeriod.endMonth) + ' ' + residencePeriod.endYear
                    : 'now'}
            </div>
        </div>
    );

    return (
        <>
            <VerticalTimelineItem
                Icon={iconMap['residence'][residencePeriod.icon]}
                iconColor={residencePeriod.color}
                country={residencePeriod.country}
                location={residencePeriod.city + ', ' + residencePeriod.country.name}
                className={className}
                info={date}
                onDelete={openModal}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
            <DeleteResidenceModal
                residence={residencePeriod}
                isOpen={modalIsOpen}
                closeModal={closeModal}
                onDelete={onDelete}
            />
        </>
    );
};

export { VerticalTimelineResidence };
