import { auth } from '@/auth';

export default async function AnalyticsPage() {
    const session = await auth();
    if (session?.user?.name !== process.env.ADMIN_USER) {
        return <div>NOT ADMIN USER!</div>;
    }

    return <></>;
}
