import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/verify/:path*',
    '/profile/:path*',
    '/createprofile/:path*',
    '/companies/:path*',
    '/tpc/companies/company/:path*',
    '/tpc/companies/add-company/:path*',
    '/company-questions/:path*',
    '/update-profile/:path*',
    '/all-students-profile/:path*',
    '/other-student-profile/:path*',
    '/tpo/dashboard/:path*',
    '/tpo/sign-in',
    '/tpo/sign-up',
    '/tpo/manage-tpc',
    '/tpc/sign-in',
    '/tpc/companies',
    '/tpc/dashboard/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token) {
    if (
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/update-profile') ||
      url.pathname.startsWith('/createprofile') ||
      url.pathname.startsWith('/company-questions') ||
      url.pathname.startsWith('/all-students-profile') ||
      url.pathname.startsWith('/other-student-profile') ||
      url.pathname.startsWith('/tpo/manage-tpc') ||
      url.pathname.startsWith('/tpo/dashboard') ||
      url.pathname.startsWith('/tpc/dashbaord') ||
      url.pathname.startsWith('/companies')
    ) {
      console.log('Redirecting to /sign-in');
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (
      url.pathname.startsWith('/tpo/dashboard')
    ) {
      console.log('Redirecting TPO to /tpo/sign-in');
      return NextResponse.redirect(new URL('/tpo/sign-in', request.url));
    }

    if (
      url.pathname.startsWith('/tpc/dashboard') ||
      url.pathname.startsWith('/tpc/companies/company') ||
      url.pathname.startsWith('/tpc/companies/add-company') ||
      url.pathname.startsWith('/tpc/companies')
    ) {
      console.log('Redirecting TPC to /tpc/sign-in');
      return NextResponse.redirect(new URL('/tpc/sign-in', request.url));
    }

    return NextResponse.next();
  }


  if (
    url.pathname === '/sign-in' ||
    url.pathname === '/sign-up' ||
    url.pathname.startsWith('/verify')
  ) {
    console.log('Redirecting logged-in user to /');
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (url.pathname.startsWith('/tpo/sign-in') || url.pathname.startsWith('/tpo/sign-up')) {
    console.log('Redirecting logged-in TPO to /tpo/dashboard');
    return NextResponse.redirect(new URL('/tpo/dashboard', request.url));
  }

  if (url.pathname.startsWith('/tpc/sign-in') || url.pathname.startsWith('/tpc/sign-up')) {
    console.log('Redirecting logged-in TPC to /tpc/dashboard');
    return NextResponse.redirect(new URL('/tpc/dashboard', request.url));
  }


  if (token.role === 'student') {
    if (token.isProfileComplete && url.pathname.startsWith('/createprofile')) {
      console.log('Redirecting student to /');
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token.isProfileComplete && !url.pathname.startsWith('/createprofile')) {
      console.log('Redirecting student to /createprofile');
      return NextResponse.redirect(new URL('/createprofile', request.url));
    }

    if (url.pathname.startsWith('/tpo/') || url.pathname.startsWith('/tpc/')) {
      console.log('Students cannot access TPO/TPC routes. Redirecting to /');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }


  if (token.role === 'tpo') {
    if (
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/createprofile') ||
      url.pathname.startsWith('/update-profile') ||
      url.pathname.startsWith('/tpc/dashboard')

    ) {
      console.log('TPOs cannot access student routes. Redirecting to /tpo/dashboard');
      return NextResponse.redirect(new URL('/tpo/dashboard', request.url));
    }


    if (url.pathname.startsWith('/tpo/manage-tpc') && token.role !== 'tpo') {
      console.log('Redirecting non-TPO users from manage-tpc');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }


  if (token.role === 'tpc') {
    if (
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/createprofile') ||
      url.pathname.startsWith('/update-profile') ||
      url.pathname.startsWith('/tpo/manage-tpc') ||
      url.pathname.startsWith('/tpo/dashboard')

    ) {
      console.log('TPCs cannot access student routes. Redirecting to /tpc/dashboard');
      return NextResponse.redirect(new URL('/tpc/dashboard', request.url));
    }
  }


  if (
    url.pathname.startsWith('/all-students-profile') ||
    url.pathname.startsWith('/other-student-profile')
  ) {
    console.log('All roles have access to these routes');
    return NextResponse.next();
  }

  return NextResponse.next();
}
