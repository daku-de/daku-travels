'use client';
import { signInAction } from '@/actions/authentication';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';

export function SignInGoogle() {
    return (
        <form
            action={async () => {
                await signInAction('google');
            }}
        >
            <Button size={'lg'} type="submit" className="gap-2">
                <FaGoogle className="text-xl" />
                Login with Google
            </Button>
        </form>
    );
}
