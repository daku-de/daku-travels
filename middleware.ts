import { auth } from '@/auth';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|images|logo.png|favicon.ico|resources).*)'],
};

export default auth((req) => {
    if (!req.auth && req.nextUrl.pathname !== '/login') {
        const newUrl = new URL('/login', req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});
