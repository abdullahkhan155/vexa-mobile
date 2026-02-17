import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userAgent } from 'next/server'

export function middleware(request: NextRequest) {
    const { device } = userAgent(request)
    const isMobile = device.type === 'mobile'

    // Only redirect if we are on the main domain to avoid infinite loops if the logic was different,
    // but since we are redirecting to a different subdomain, it should be fine.
    // We also want to ensure we don't redirect if we are already on m.vexacart.shop (though this middleware is likely running on the main app).

    if (isMobile && request.nextUrl.hostname !== 'm.vexacart.shop') {
        const url = request.nextUrl.clone()
        url.hostname = 'm.vexacart.shop'
        url.protocol = 'https'
        url.port = '' // Ensure port is cleared if running locally on a port, though this is for production mostly.

        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc) - generic regex for common extensions
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
