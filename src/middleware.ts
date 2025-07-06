import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  ADMIN_DASHBOARD,
  LOGIN,
  PUBLIC_ROUTE,
  USER_DASHBOARD,
} from "@/const/routes";

const ADMIN = "admin";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const pathName = req.nextUrl.pathname;
    const userToken: any = req.nextauth.token;

    if (!userToken) return;
    const isPublicRoutes = PUBLIC_ROUTE.includes(pathName);
    const isAdminRoutes = pathName.startsWith("/admin");
    const isAdmin = userToken?.user?.role === ADMIN;

    if (isPublicRoutes && isAdmin) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD, req.url));
    }

    if (isAdminRoutes && !isAdmin) {
      return NextResponse.redirect(new URL(LOGIN, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathName = req.nextUrl.pathname;

        if (PUBLIC_ROUTE.includes(pathName)) return true;

        if (!token) return false;

        if (pathName.startsWith("/admin")) {
          return token.user?.role === ADMIN;
        }

        return true;
      },
    },
    pages: {
      signIn: LOGIN,
    },
  }
);
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
