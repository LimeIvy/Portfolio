import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "qiita-user-contents.imgix.net",
      // 必要に応じて他の外部ドメインも追加
    ],
  },
};

export default nextConfig;
