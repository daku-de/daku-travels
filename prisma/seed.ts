import { PrismaClient } from '@prisma/client';
import { addLocation, addTravel, addResidencePeriod } from '../actions/database-actions';
import { StatusValues } from '../types/location';

const prisma = new PrismaClient();

async function main() {
    await addTravel({
        destination: {
            name: 'Germany',
            id: 'DEU',
            code: 'DE',
            continents: ['Europe'],
            label_x: 9.678348,
            label_y: 50.961733,
            zoomFactor: 20,
        },
        year: 2020,
        month: 3,
        duration: 10,
        icon: 'none',
        color: 'bg-red-500',
    });
    await addResidencePeriod({
        city: 'Nürnberg',
        country: {
            name: 'Germany',
            id: 'DEU',
            code: 'DE',
            continents: ['Europe'],
            label_x: 9.678348,
            label_y: 50.961733,
            zoomFactor: 20,
        },
        startYear: 2001,
        startMonth: 8,
        endMonth: 3,
        endYear: 2021,
        icon: 'plane',
        color: 'bg-purple-500',
    });
    await addLocation({
        status: StatusValues.active,
        country: {
            name: 'Germany',
            id: 'DEU',
            code: 'DE',
            continents: ['Europe'],
            label_x: 9.678348,
            label_y: 50.961733,
            zoomFactor: 20,
        },
        name: '',
        shortDescription: '',
        activities: [],
        map: '',
        video: '',
        image: '',
        color: '',
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
