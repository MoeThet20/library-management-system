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
    const isAdmin = userToken?.user?.role === ADMIN;

    if (isPublicRoutes && isAdmin) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD, req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === USER_DASHBOARD) {
          return true;
        }
        return !!token;
      },
    },
    pages: {
      signIn: LOGIN,
    },
  }
);
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  matcher: []
};
