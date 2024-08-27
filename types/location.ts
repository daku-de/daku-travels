import { FaBicycle, FaBuilding, FaCarSide, FaPassport, FaPlane, FaShip, FaWalking } from 'react-icons/fa';
import { FaHouseChimney, FaPerson } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { MdFamilyRestroom } from 'react-icons/md';

export interface Activity {
    name: string;
    properties: Record<string, string>;
    tags: string[];
}

export enum StatusValues {
    active = 'active',
    archived = 'archived',
    draft = 'draft',
    visited = 'visited',
}

export const iconColors: string[] = [
    'bg-sky-500',
    'bg-purple-500',
    'bg-amber-500',
    'bg-green-500',
    'bg-red-500',
    'flag',
];

export type IconName = 'bicycle' | 'plane' | 'car' | 'ship' | 'walking' | 'none';

export const iconMap: { travel: Record<string, IconType | null>; residence: Record<string, IconType | null> } = {
    travel: {
        bicycle: FaBicycle,
        plane: FaPlane,
        car: FaCarSide,
        ship: FaShip,
        walking: FaWalking,
        none: null,
    },
    residence: {
        house: FaHouseChimney,
        building: FaBuilding,
        family: MdFamilyRestroom,
        person: FaPerson,
        passport: FaPassport,
        none: null,
    },
};

export interface TravelInput {
    destination: Country;
    year: number;
    month: number;
    duration: number;
    color: string;
    icon: string;
}

export interface Travel extends TravelInput {
    id: string;
    createdAt: Date;
}

export interface ResidencePeriodInput {
    city: string;
    country: Country;
    startYear: number;
    startMonth: number;
    endYear?: number | null;
    endMonth?: number | null;
    color: string;
    icon: string;
}

export interface ResidencePeriod extends ResidencePeriodInput {
    id: string;
    createdAt: Date;
}

export interface Country {
    name: string;
    code: string;
    id: string;
    continents: string[];
    zoomFactor: number;
    label_x: number;
    label_y: number;
}

export interface Region {
    id: string;
    name: string;
    geoJsonName: string;
    zoomFactor: number;
    center: [number, number];
}

export interface LocationInput {
    status: StatusValues;
    country: Country;
    name: string;
    shortDescription: string;
    activities: Activity[];
    map: string;
    video: string;
    image: string;
    color: string;
}

export interface Location extends LocationInput {
    id: string;
    createdAt: Date;
}
