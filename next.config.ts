import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    //appDir: true, // Fundamental para App Router
  },
  // Remova outras configurações problemáticas
  typescript: {
    ignoreBuildErrors: true, // Opcional: ignora erros TS durante builds
  },
};

export default nextConfig;