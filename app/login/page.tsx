import type { Metadata } from 'next';
import { SignInGitHub } from './github-signin';
import { SignInGoogle } from './google-signin';

export const metadata: Metadata = {
    title: "Login | DAKU'S TRAVELS",
};

export default function Page() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-card w-[480px] max-w-[85%] p-4 rounded-lg flex flex-col items-center shadow-lg gap-2">
                <SignInGitHub />
                <SignInGoogle />
            </div>
        </div>
    );
}
