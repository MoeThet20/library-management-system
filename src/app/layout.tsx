import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SessionWrapper } from "@/components";
import { ReduxProvider } from "@/redux/provider";
import { CopyRight } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Library Management System",
  description: "LMS",
};

export default function RootLayout({
  children,
  params: { session, ...params },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <SessionWrapper session={session}>{children}</SessionWrapper>
          </AppRouterCacheProvider>
        </ReduxProvider>
        {/* <CopyRight /> */}
      </body>
    </html>
  );
}
