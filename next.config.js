/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出，输出到 out 目录
  output: 'export',
  
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
  
  // 禁用服务器端功能，因为使用静态导出
  trailingSlash: true,
}

module.exports = nextConfig 