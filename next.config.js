/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片配置
  images: {
    unoptimized: true, // Cloudflare Pages 优化
  },
  
  // 基础路径配置（如果需要部署到子目录）
  // basePath: '',
  
  // 资源前缀配置
  // assetPrefix: '',
  
  // 跳过类型检查（可选，提高构建速度）
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint 配置
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig 