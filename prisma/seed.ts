const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.location.createMany({
        data: [
            {
                id: '1722949240085',
                status: 'active',
                country: JSON.stringify({
                    name: 'Germany',
                    code: 'DE',
                    id: 'DEU',
                }),
                name: 'München',
                shortDescription: 'A short description about München',
                map: 'Link to map',
                video: 'Link to video',
                image: 'Link to image',
                color: '#4287f5',
                activities: JSON.stringify([]),
            },
            {
                id: '1722611250001',
                status: 'archived',
                country: JSON.stringify({
                    name: 'Norway',
                    code: 'NO',
                    id: 'NOR',
                }),
                name: 'Lofoten',
                shortDescription: 'A short description about Lofoten',
                map: 'Link to map',
                video: 'Link to video',
                image: 'Link to image',
                color: '#e12121',
                activities: JSON.stringify([]),
            },
            {
                id: '1722611250000',
                status: 'draft',
                country: JSON.stringify({
                    name: 'New Zealand',
                    code: 'NZ',
                    id: 'NZL',
                }),
                name: 'New Zealand',
                shortDescription: 'A short description about New Zealand',
                map: 'Link to map',
                video: 'Link to video',
                image: 'Link to image',
                color: '#41c121',
                activities: JSON.stringify([]),
            },
        ],
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
