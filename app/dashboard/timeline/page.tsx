'use client';
import { loadResidencePeriods, loadTravels } from '@/actions/actions';
import { VerticalTimeline } from '@/components/ui/verticalTimeline/verticalTimeline';
import { VerticalTimelineAddItem } from '@/components/ui/verticalTimeline/verticalTimelineAdd';
import { VerticalTimelineResidence } from '@/components/ui/verticalTimeline/verticalTimelineResidence';
import { VerticalTimelineTravel } from '@/components/ui/verticalTimeline/verticalTimelineTravel';
import { ResidencePeriod, Travel } from '@/types/location';
import { useEffect, useState } from 'react';

type NormalizedItem = {
    id: string;
    year: number;
    month: number;
    item: Travel | ResidencePeriod;
};

function normalizeItems(travels: Travel[], residences: ResidencePeriod[]): NormalizedItem[] {
    const normalizedTravels = travels.map((travel) => ({
        id: travel.id,
        year: travel.year,
        month: travel.month,
        item: travel,
    }));

    const normalizedResidences = residences.map((residence) => ({
        id: residence.id,
        year: residence.startYear,
        month: residence.startMonth,
        item: residence,
    }));

    return [...normalizedTravels, ...normalizedResidences];
}

function sortItems(items: NormalizedItem[]): NormalizedItem[] {
    return items.sort((a, b) => {
        if (a.year !== b.year) {
            return b.year - a.year;
        }
        return b.month - a.month;
    });
}

export default function EditPage() {
    const [travels, setTravels] = useState<Travel[]>([]);
    const [residences, setResidences] = useState<ResidencePeriod[]>([]);
    const [sortedItems, setSortedItems] = useState<NormalizedItem[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            setTravels(await loadTravels());
            setResidences(await loadResidencePeriods());
        };
        fetchItems();
    }, []);

    useEffect(() => {
        setSortedItems(sortItems(normalizeItems(travels, residences)));
    }, [travels, residences]);

    return (
        <VerticalTimeline>
            <VerticalTimelineAddItem onClick={() => console.log('ADD A NEW ITEM PLS')} />
            {sortedItems.map((item) => {
                if ('destination' in item.item) {
                    return <VerticalTimelineTravel key={'travel-' + item.id} travel={item.item} />;
                } else {
                    return <VerticalTimelineResidence key={'residence-' + item.id} residencePeriod={item.item} />;
                }
            })}
        </VerticalTimeline>
    );
}
