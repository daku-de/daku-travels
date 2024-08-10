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
    id: string;
    status: StatusValues;
    countrycode: string;
    name: string;
    shortDescription: string;
    activities: Activity[];
    map: string;
    video: string;
    image: string;
    color: string;
}
