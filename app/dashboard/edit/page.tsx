import { loadCountries } from '@/actions/actions';
import { auth } from '@/auth';

export default async function EditPage() {
    const session = await auth();
    if (session?.user?.name !== process.env.ADMIN_USER) {
        return <div>NOT ADMIN USER!</div>;
    }
    const countries = await loadCountries();

    return (
        <div>
            {countries.map((c) => {
                return <div key={c.id}>{c.name}</div>;
            })}
        </div>
    );
}
