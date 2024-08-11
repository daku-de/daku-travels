'use server';

import fs from 'fs';
import path from 'path';
import { Location } from '@/types/location';

const DATA_FILE = path.join(process.cwd(), 'data', 'locations.json');

function storeLocations(locations: Location[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(locations, null, 4));
}

export async function addLocation(location: Location) {
    const locations = await loadLocations();
    locations.push(location);
    storeLocations(locations);
    return true;
}

export async function editLocation(location: Location) {
    const locations = await loadLocations();
    const oldLocation = locations.find((c) => c.id == location.id);
    if (!oldLocation) return false;
    locations[locations.indexOf(oldLocation)] = location;
    storeLocations(locations);
    return true;
}

export async function deleteLocation(location: Location) {
    const locations = await loadLocations();
    storeLocations(locations.filter((c) => c.id !== location.id));
    return true;
}

export async function loadLocations(): Promise<Location[]> {
    const jsonData = fs.readFileSync(DATA_FILE, 'utf-8');
    const locations: Location[] = JSON.parse(jsonData);
    return locations;
}
