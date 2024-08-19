'use client';
import { signInAction } from '@/actions/authentication';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

export function SignInGitHub() {
    return (
        <form
            action={async () => {
                await signInAction('github');
            }}
        >
            <Button size={'lg'} type="submit" className="gap-2">
                <FaGithub className="text-xl" />
                Login with GitHub
            </Button>
        </form>
    );
}
