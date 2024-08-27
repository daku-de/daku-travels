import { loadLocations } from '@/actions/database-actions';
import { redirect } from 'next/navigation';

export default async function EditLocation({ params }: { params: { location: string } }) {
    const locations = await loadLocations();
    const location = locations.find((l) => l.id === params.location);

    if (!location) {
        redirect('/dashboard/edit');
    }

    return <div>{location?.name}</div>;
}
