import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  ADMIN_DASHBOARD,
  CHECK_IN,
  USER_DASHBOARD,
  USER_PATHS,
} from "@/const/routes";

const ADMIN = "ADMIN";
const STAFF = "STAFF";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const pathName = req.nextUrl.pathname;
    const userToken: any = req.nextauth.token;

    if (!userToken) return;

    const isIncludeUserRoutes = USER_PATHS.includes(pathName);
    const isAdmin = userToken?.user?.role === ADMIN;
    const isStaff = userToken?.user?.role === STAFF;

    if (isStaff && pathName !== CHECK_IN && pathName !== USER_DASHBOARD) {
      return NextResponse.redirect(new URL(CHECK_IN, req.url));
    }

    // if (isIncludeAdminRoutes && !isAdmin) {
    //   return NextResponse.redirect(new URL(USER_DASHBOARD, req.url));
    // }

    if (isIncludeUserRoutes && isAdmin) {
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
      signIn: "/login",
    },
  }
);
export const config = {
  matcher: [],
};
