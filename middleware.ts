import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isPublicRoute = createRouteMatcher(publicRoutes);
  const isAuthRoute = createRouteMatcher(authRoutes);
  const isApiAuthRoute = createRouteMatcher([apiAuthPrefix]);

  if (isApiAuthRoute(request)) {
    return;
  }

  const isLoggedIn = !!(await convexAuth.isAuthenticated());

  console.log("Auth status:", isLoggedIn);
  console.log("Current path:", request.nextUrl.pathname);
  console.log("Is auth route:", isAuthRoute(request));
  console.log("Is public route:", isPublicRoute(request));

  if (isAuthRoute(request)) {
    if (isLoggedIn) {
      return nextjsMiddlewareRedirect(request, DEFAULT_LOGIN_REDIRECT);
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute(request)) {
    let callbackUrl = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      callbackUrl += request.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, request.nextUrl),
    );
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// import {
//   authRoutes,
//   publicRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   apiRoutesPrefix,
// } from "@/routes";

// import { authConfig } from "@/server/auth/config";
// import NextAuth from "next-auth";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth;

//   const isApiRoute = nextUrl.pathname.startsWith(apiRoutesPrefix);

//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return;
//   }

//   if (!isLoggedIn && !isPublicRoute && !isApiRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     return Response.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }

//   return;
// });
