'use server';

import { PrismaClient } from '@prisma/client';
import {
    Location,
    ResidencePeriod,
    Travel,
    Activity,
    StatusValues,
    TravelInput,
    ResidencePeriodInput,
    LocationInput,
} from '@/types/location';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function addLocation(location: LocationInput) {
    const existingCountry = await prisma.country.findUnique({
        where: { id: location.country.id },
    });
    if (!existingCountry) {
        await prisma.country.create({
            data: location.country,
        });
    }
    await prisma.location.create({
        data: {
            status: location.status,
            name: location.name,
            shortDescription: location.shortDescription,
            map: location.map,
            video: location.video,
            image: location.image,
            color: location.color,
            countryId: location.country.id,
            activities: JSON.stringify(location.activities),
        },
    });
    return true;
}

export async function editLocation(location: Location) {
    const existingCountry = await prisma.country.findUnique({
        where: { id: location.country.id },
    });
    if (!existingCountry) {
        await prisma.country.create({
            data: location.country,
        });
    }
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
            countryId: location.country.id,
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
    const locations = await prisma.location.findMany({ include: { country: true } });

    return locations.map((location) => ({
        ...location,
        status: location.status as StatusValues,
        activities: JSON.parse(location.activities as string) as Activity[],
    }));
}

export async function loadTravels(): Promise<Travel[]> {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    return await prisma.travel.findMany({ where: { userId: session.user.id }, include: { destination: true } });
}

export async function addTravel(travel: TravelInput): Promise<Travel> {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    const existingCountry = await prisma.country.findUnique({
        where: { id: travel.destination.id },
    });
    if (!existingCountry) {
        await prisma.country.create({
            data: travel.destination,
        });
    }
    return await prisma.travel.create({
        data: {
            countryId: travel.destination.id,
            year: travel.year,
            month: travel.month,
            duration: travel.duration,
            icon: travel.icon,
            color: travel.color,
            userId: session.user.id,
        },
        include: { destination: true },
    });
}

export async function deleteTravel(travel: Travel) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    await prisma.travel.delete({ where: { id: travel.id, userId: session.user.id } });
    return true;
}

export async function loadResidencePeriods(): Promise<ResidencePeriod[]> {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    return await prisma.residencePeriod.findMany({ where: { userId: session.user.id }, include: { country: true } });
}

export async function addResidencePeriod(residence: ResidencePeriodInput): Promise<ResidencePeriod> {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    const existingCountry = await prisma.country.findUnique({
        where: { id: residence.country.id },
    });
    if (!existingCountry) {
        await prisma.country.create({
            data: residence.country,
        });
    }

    const residencePeriods = await prisma.residencePeriod.findMany({
        orderBy: [{ startYear: 'asc' }, { startMonth: 'asc' }],
        include: { country: true },
    });

    let previousResidence: ResidencePeriod | null = null;
    let nextResidence: ResidencePeriod | null = null;

    for (const period of residencePeriods) {
        const periodEndYearDefined = period.endYear !== undefined && period.endMonth !== undefined;

        if (
            (residence.startYear > period.startYear ||
                (residence.startYear === period.startYear && residence.startMonth >= period.startMonth)) &&
            (!periodEndYearDefined ||
                residence.startYear < (period.endYear as number) ||
                (residence.startYear === (period.endYear as number) &&
                    residence.startMonth < (period.endMonth as number)))
        ) {
            await prisma.residencePeriod.update({
                where: { id: period.id },
                data: {
                    endYear: residence.startYear,
                    endMonth: residence.startMonth,
                },
            });
        }

        if (
            period.startYear < residence.startYear ||
            (period.startYear === residence.startYear && period.startMonth < residence.startMonth)
        ) {
            previousResidence = period;
        } else if (
            !nextResidence &&
            (period.startYear > residence.startYear ||
                (period.startYear === residence.startYear && period.startMonth > residence.startMonth))
        ) {
            nextResidence = period;
            break;
        }
    }

    if (previousResidence && !previousResidence.endYear && !previousResidence.endMonth) {
        await prisma.residencePeriod.update({
            where: { id: previousResidence.id },
            data: {
                endYear: residence.startYear,
                endMonth: residence.startMonth,
            },
        });
    }

    let endYear = residence.endYear;
    let endMonth = residence.endMonth;
    if (!endYear && !endMonth && nextResidence) {
        endYear = nextResidence.startYear;
        endMonth = nextResidence.startMonth;
    }

    return await prisma.residencePeriod.create({
        data: {
            city: residence.city,
            countryId: residence.country.id,
            startYear: residence.startYear,
            startMonth: residence.startMonth,
            icon: residence.icon,
            color: residence.color,
            userId: session.user.id,
            endYear,
            endMonth,
        },
        include: { country: true },
    });
}

export async function deleteResidencePeriod(residence: ResidencePeriod) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error('Unauthorized');
    }
    await prisma.residencePeriod.delete({ where: { id: residence.id, userId: session.user.id } });
    return true;
}
