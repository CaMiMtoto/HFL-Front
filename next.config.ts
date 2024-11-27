import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "licensing.moh.gov.rw"
            }
        ]
    }
};

export default nextConfig;
