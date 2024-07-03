import { NextRequest, NextResponse } from "next/server";
// import {
//   DEFAULT_LOGIN_REDIRECT_URL,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "./routes";
// import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // const isLoggedIn = !!request.cookies.get("next-auth.session-token")?.value;
  // const token = await getToken({
  //   req: request,
  // });
  // const currentURL = request.nextUrl.pathname;
  // const isAPIAuthRoute = currentURL.startsWith(apiAuthPrefix);
  // const isAuthRoute = authRoutes.includes(currentURL);
  // const isPublicRoute = publicRoutes.includes(currentURL);
  // if (isAPIAuthRoute) return null;
  // if (isAuthRoute) {
  //   if (isLoggedIn)
  //     return NextResponse.redirect(
  //       new URL(DEFAULT_LOGIN_REDIRECT_URL, request.url)
  //     );
  //   return null;
  // }
  // if (!isLoggedIn && !isPublicRoute)
  //   return NextResponse.redirect(new URL("/login", request.url));
  // return null;
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
