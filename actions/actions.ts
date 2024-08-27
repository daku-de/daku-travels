'use server';

import { Country } from '@/types/location';
import fs from 'fs';

export async function loadCountries(): Promise<Country[]> {
    const geojson = JSON.parse(fs.readFileSync('./public/resources/world-map-with-zoom-factor.json').toLocaleString());
    const countries = geojson.features;
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
