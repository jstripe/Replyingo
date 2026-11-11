/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST || ".next",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
