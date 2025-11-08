import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/radiogossip" : "",
  output: "export",
};

export default nextConfig;
