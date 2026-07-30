import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.29.208'],
};

export default withFlowbiteReact(nextConfig);