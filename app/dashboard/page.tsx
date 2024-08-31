import { auth } from '@/auth';
import DashboardHome from './dashboard-home';

export default async function Dashboard() {
    const session = await auth();
    if (session?.user?.name !== process.env.ADMIN_USER) {
        return <div>Placeholder</div>;
    }

    return <DashboardHome />;
}
