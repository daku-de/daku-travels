import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma, PrismaClient } from '@prisma/client';
import type { Adapter, AdapterAccount, AdapterUser } from 'next-auth/adapters';
import slugify from 'slugify';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub, Google],
    adapter: CustomPrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.provider = account?.provider;

                const updatedUser = await prisma.user.findUnique({
                    where: { id: user.id },
                });

                if (updatedUser) {
                    token.name = updatedUser.name;
                }
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.provider = token.provider as string;
            return session;
        },
    },
});

function CustomPrismaAdapter(p: PrismaClient): Adapter {
    return {
        ...PrismaAdapter(p),
        createUser: async ({ id: _id, ...data }) => {
            const baseName = slugify(data.name || 'user', {
                lower: true,
                strict: true,
                replacement: '-',
            });
            let uniqueName = baseName;
            let count = 0;
            let user: AdapterUser | null = null;
            do {
                try {
                    user = await p.user.create({
                        data: {
                            ...data,
                            name: uniqueName,
                        },
                    });
                } catch (error) {
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        if (
                            error.code === 'P2002' &&
                            Array.isArray(error.meta?.target) &&
                            error.meta?.target?.includes('name')
                        ) {
                            count++;
                            uniqueName = `${baseName}${count}`;
                        } else {
                            throw error;
                        }
                    } else {
                        throw error;
                    }
                }
            } while (!user);
            return user;
        },
        getUser: (id) => p.user.findUnique({ where: { id } }),
        getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
        updateUser: async ({ id, ...data }) => {
            const baseName = slugify(data.name || 'user', {
                lower: true,
                strict: true,
                replacement: '-',
            });
            let uniqueName = baseName;
            let count = 0;
            let user: AdapterUser | null = null;
            do {
                try {
                    user = await p.user.update({
                        where: { id },
                        data: {
                            ...data,
                            name: uniqueName,
                        },
                    });
                } catch (error) {
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        if (
                            error.code === 'P2002' &&
                            Array.isArray(error.meta?.target) &&
                            error.meta?.target?.includes('name')
                        ) {
                            count++;
                            uniqueName = `${baseName}${count}`;
                        } else {
                            throw error;
                        }
                    } else {
                        throw error;
                    }
                }
            } while (!user);
            return user;
        },
        linkAccount: (data) => {
            return p.account.create({ data }) as unknown as AdapterAccount;
        },
    };
}
