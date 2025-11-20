import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createMockClient } from '@/lib/supabase-mock'

export async function updateSession(request: NextRequest) {
    // Bypass auth in mock mode
    if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        });
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    let supabase;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        supabase = createMockClient() as any;
    } else {
        supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        request.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                        response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        })
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                    },
                    remove(name: string, options: CookieOptions) {
                        request.cookies.set({
                            name,
                            value: '',
                            ...options,
                        })
                        response = NextResponse.next({
                            request: {
                                headers: request.headers,
                            },
                        })
                        response.cookies.set({
                            name,
                            value: '',
                            ...options,
                        })
                    },
                },
            }
        )
    }

    const { data: { user } } = await supabase.auth.getUser()

    // Protected routes logic
    // If user is not signed in and tries to access protected routes, redirect to login
    if (request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/modes') ||
        request.nextUrl.pathname.startsWith('/settings') ||
        request.nextUrl.pathname.startsWith('/onboarding')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // If user is signed in but hasn't completed onboarding, redirect to onboarding
    // (Skip this check if already on onboarding or api routes)
    if (user && !request.nextUrl.pathname.startsWith('/onboarding') && !request.nextUrl.pathname.startsWith('/api')) {
        // We would check onboarding status here, but that requires a DB call.
        // For middleware performance, we might skip this or use a cookie flag.
        // Let's assume we handle this in the page components or layout for now to avoid DB calls in middleware if possible.
        // Or we can fetch the user profile.
    }

    return response
}
