declare module 'next-auth' {
    interface Session {
        provider: string;
    }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
    interface JWT {
        provider?: string;
    }
}
