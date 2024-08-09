'use server';

import fs from 'fs';
import path from 'path';
import { Country } from '@/types/country';

const DATA_FILE = path.join(process.cwd(), 'data', 'countries.json');

function storeCountries(countries: Country[]) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(countries, null, 4));
}

export async function addCountry(country: Country) {
    const countries = await loadCountries();
    countries.push(country);
    storeCountries(countries);
    return true;
}

export async function editCountry(country: Country) {
    const countries = await loadCountries();
    const oldCountry = countries.find((c) => c.id == country.id);
    if (!oldCountry) return false;
    countries[countries.indexOf(oldCountry)] = country;
    storeCountries(countries);
    return true;
}

export async function deleteCountry(country: Country) {
    const countries = await loadCountries();
    storeCountries(countries.filter((c) => c.id !== country.id));
    return true;
}

export async function loadCountries(): Promise<Country[]> {
    const jsonData = fs.readFileSync(DATA_FILE, 'utf-8');
    const countries: Country[] = JSON.parse(jsonData);
    return countries;
}
