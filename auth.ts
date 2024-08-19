import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google],
    callbacks: {
        jwt({ token, user, account }) {
            if (user) {
                token.id = account?.provider + '-' + user.id;
                token.provider = account?.provider;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.provider = token.provider as string;
            return session;
        },
    },
});
