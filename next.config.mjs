import withPWA from "next-pwa";
/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})(nextConfig);
