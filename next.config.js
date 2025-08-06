/** @type {import('next').NextConfig} */
const nextConfig = {
  // 输出配置 - 仅在生产构建时使用静态导出
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  
  // 图片配置
  images: {
    unoptimized: true, // Cloudflare Pages 优化
  },
  
  // 基础路径配置（如果需要部署到子目录）
  // basePath: '',
  
  // 资源前缀配置
  // assetPrefix: '',
  
  // 禁用服务器端功能（仅在静态导出时）
  ...(process.env.NODE_ENV === 'production' && {
    trailingSlash: true,
  }),
  
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