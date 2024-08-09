'use server';

import { signIn } from '@/auth';

export async function signInAction() {
    await signIn('github', { redirectTo: '/dashboard', redirect: true });
}
