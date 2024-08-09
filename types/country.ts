export interface Activity {
    name: string;
    properties: Record<string, string>;
    tags: string[];
}

export interface Country {
    id: string;
    status: 'active' | 'archived' | 'draft' | 'visited';
    countrycode: string;
    name: string;
    shortDescription: string;
    activities: Activity[];
    map: string;
    video: string;
    image: string;
    color: string;
}
