#!/bin/bash

# Cardity Web - Cloudflare Pages 部署脚本

echo "🚀 开始部署 Cardity Web 到 Cloudflare Pages..."

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI 未安装，正在安装..."
    npm install -g wrangler
fi

# 检查是否已登录 Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "🔐 请先登录 Cloudflare..."
    wrangler login
fi

# 清理之前的构建
echo "🧹 清理之前的构建..."
rm -rf .next out

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "out" ]; then
    echo "❌ 构建失败，out 目录不存在"
    exit 1
fi

echo "✅ 构建成功！"

# 部署到 Cloudflare Pages
echo "🌐 部署到 Cloudflare Pages..."
wrangler pages deploy out --project-name=cardity-web

echo "🎉 部署完成！"
echo "📱 你的网站应该很快就可以访问了"
echo "🔗 检查 Cloudflare Dashboard 获取部署状态" 