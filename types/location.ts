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

export interface Travel {
    id: string;
    destination: Country;
    year: number;
    month: number;
    duration: number;
}

export interface ResidencePeriod {
    id: string;
    city: string;
    country: Country;
    startYear: number;
    startMonth: number;
    endYear?: number;
    endMonth?: number;
}

export interface Country {
    name: string;
    code: string;
    id: string;
}

export interface Location {
    id: string;
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
