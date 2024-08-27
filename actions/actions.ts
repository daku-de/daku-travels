'use server';

import { Country } from '@/types/location';
import geojson from '@/public/resources/world-map-with-zoom-factor.json';

interface GeoJSON {
    type: string;
    features: GeoJSONFeature[];
}

interface GeoJSONFeature {
    type: string;
    properties: {
        label_x: number;
        label_y: number;
        zoom_factor: number;
        name: string;
        iso_a2_eh: string;
        adm0_a3: string;
        continent: string;
    };
}

export async function loadCountries(): Promise<Country[]> {
    const geojsonData = geojson as GeoJSON;
    const countries = geojsonData.features;
    const countryList: Country[] = countries.map(
        (feature: {
            properties: {
                label_x: number;
                label_y: number;
                zoom_factor: number;
                name: string;
                iso_a2_eh: string;
                adm0_a3: string;
                continent: string;
            };
        }) => ({
            name: feature.properties.name,
            code: feature.properties.iso_a2_eh !== '-99' ? feature.properties.iso_a2_eh : feature.properties.adm0_a3,
            id: feature.properties.adm0_a3,
            continents: feature.properties.continent.split(', '),
            zoomFactor: feature.properties.zoom_factor,
            label_x: feature.properties.label_x,
            label_y: feature.properties.label_y,
        }),
    );
    countryList.sort((a, b) => (a.name < b.name ? -1 : 1));
    return countryList;
}
