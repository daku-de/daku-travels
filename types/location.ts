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
