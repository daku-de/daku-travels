'use server';

import { PrismaClient } from '@prisma/client';
import { Location, ResidencePeriod, Travel, Country, Activity, StatusValues } from '@/types/location';

const prisma = new PrismaClient();

export async function addLocation(location: Location) {
    await prisma.location.create({
        data: {
            id: location.id,
            status: location.status,
            name: location.name,
            shortDescription: location.shortDescription,
            map: location.map,
            video: location.video,
            image: location.image,
            color: location.color,
            country: JSON.stringify(location.country),
            activities: JSON.stringify(location.activities),
        },
    });
    return true;
}

export async function editLocation(location: Location) {
    const existingLocation = await prisma.location.findUnique({ where: { id: location.id } });
    if (!existingLocation) return false;

    await prisma.location.update({
        where: { id: location.id },
        data: {
            status: location.status,
            name: location.name,
            shortDescription: location.shortDescription,
            map: location.map,
            video: location.video,
            image: location.image,
            color: location.color,
            country: JSON.stringify(location.country),
            activities: JSON.stringify(location.activities),
        },
    });
    return true;
}

export async function deleteLocation(location: Location) {
    await prisma.location.delete({ where: { id: location.id } });
    return true;
}

export async function loadLocations(): Promise<Location[]> {
    const locations = await prisma.location.findMany();

    return locations.map((location) => ({
        id: location.id,
        status: location.status as StatusValues,
        name: location.name,
        shortDescription: location.shortDescription,
        map: location.map,
        video: location.video,
        image: location.image,
        color: location.color,
        country: JSON.parse(location.country as string) as Country,
        activities: JSON.parse(location.activities as string) as Activity[],
    }));
}

function isCountry(value: any): value is Country {
    return (
        value &&
        typeof value === 'object' &&
        typeof value.name === 'string' &&
        typeof value.code === 'string' &&
        typeof value.id === 'string'
    );
}

export async function loadTravels(): Promise<Travel[]> {
    const travels = await prisma.travel.findMany();

    return travels.map((travel) => ({
        id: travel.id,
        destination: isCountry(travel.destination) ? travel.destination : { name: '', code: '', id: '' },
        year: travel.year,
        month: travel.month,
        duration: travel.duration,
    }));
}

export async function addTravel(travel: Travel) {
    await prisma.travel.create({
        data: {
            id: travel.id,
            destination: JSON.stringify(travel.destination),
            year: travel.year,
            month: travel.month,
            duration: travel.duration,
        },
    });
    return true;
}

export async function deleteTravel(travel: Travel) {
    await prisma.travel.delete({ where: { id: travel.id } });
    return true;
}

export async function loadResidencePeriods(): Promise<ResidencePeriod[]> {
    const residencePeriods = await prisma.residencePeriod.findMany();

    return residencePeriods.map((residence) => ({
        id: residence.id,
        city: residence.city,
        country: isCountry(residence.country) ? residence.country : { name: '', code: '', id: '' },
        startYear: residence.startYear,
        startMonth: residence.startMonth,
        endYear: residence.endYear ?? undefined,
        endMonth: residence.endMonth ?? undefined,
    }));
}

export async function addResidencePeriod(residence: ResidencePeriod) {
    await prisma.residencePeriod.create({
        data: {
            id: residence.id,
            city: residence.city,
            country: JSON.stringify(residence.country),
            startYear: residence.startYear,
            startMonth: residence.startMonth,
            endYear: residence.endYear,
            endMonth: residence.endMonth,
        },
    });
    return true;
}

export async function deleteResidencePeriod(residence: ResidencePeriod) {
    await prisma.residencePeriod.delete({ where: { id: residence.id } });
    return true;
}
