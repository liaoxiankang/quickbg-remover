# 部署指南 - QuickBG Remover

## 部署前准备

### 1. 获取 Remove.bg API 密钥

1. 访问 [Remove.bg 官网](https://www.remove.bg)
2. 注册账号
3. 登录后在控制台获取 API 密钥
4. 免费用户：每月 50 张图片处理
5. 付费用户：根据套餐提供更多配额

### 2. 环境配置

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```env
# Remove.bg API Configuration
REMOVE_BG_API_KEY=your_remove_bg_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Sentry (Optional)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## 部署方式

### 1. 云平台部署 (推荐)

#### Cloudflare Pages 部署

1. **推送代码到 Git 仓库**
2. **连接 Cloudflare Pages**
3. **配置环境变量**
4. **自动部署**

环境变量配置：
```
REMOVE_BG_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.pages.dev
```

#### Vercel 部署

1. **推送代码到 Git 仓库**
2. **在 Vercel 中导入项目**
3. **配置环境变量**
4. **自动部署**

环境变量配置：
```
REMOVE_BG_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

#### Netlify 部署

1. **推送代码到 Git 仓库**
2. **在 Netlify 中导入项目**
3. **配置环境变量**
4. **设置构建命令**
5. **自动部署**

构建配置：
- Build command: `npm run build`
- Publish directory: `.next`
- Environment variables: 同上

### 2. Docker 部署

#### 使用 Docker Compose

```bash
# 克隆项目
git clone <repository-url>
cd background-remover

# 配置环境变量
echo "REMOVE_BG_API_KEY=your_api_key" > .env

# 启动容器
docker-compose up -d
```

#### 使用 Docker

```bash
# 构建镜像
docker build -t background-remover .

# 运行容器
docker run -d \
  --name background-remover \
  -p 3000:3000 \
  -e REMOVE_BG_API_KEY=your_api_key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  background-remover
```

### 3. 传统服务器部署

#### 使用 PM2

```bash
# 安装 PM2
npm install -g pm2

# 构建应用
npm run build

# 启动应用
pm2 start ecosystem.config.js

# 保存 PM2 配置
pm2 save
pm2 startup
```

#### 使用 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/background-remover/.next;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css text/js text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

## 环境变量配置

### 必需变量
```
REMOVE_BG_API_KEY=your_remove_bg_api_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 可选变量
```
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NODE_ENV=production
```

## 部署验证

### 1. 功能测试
- 访问网站首页
- 上传测试图片
- 验证处理结果
- 测试下载功能

### 2. 性能测试
- 页面加载速度
- API 响应时间
- 图片处理速度

### 3. 安全测试
- HTTPS 配置
- API 密钥安全
- 文件上传限制

## 监控和分析

### 1. 性能监控
- Google Analytics
- Cloudflare Analytics
- Vercel Analytics

### 2. 错误监控
- Sentry
- Rollbar

### 3. 使用统计
- API 调用次数
- 用户访问量
- 图片处理统计

## 故障排除

### 常见问题

1. **API 调用失败**
   - 检查 API 密钥是否正确
   - 确认 API 配额是否充足
   - 查看网络连接

2. **构建失败**
   - 检查 Node.js 版本
   - 确认依赖安装正确
   - 检查环境变量配置

3. **部署失败**
   - 检查 Git 仓库权限
   - 确认环境变量配置
   - 查看部署日志

### 日志查看

```bash
# Docker 容器日志
docker logs background-remover

# PM2 日志
pm2 logs background-remover

# Vercel 日志
vercel logs
```

## 扩展配置

### 1. 自定义域名
```bash
# Cloudflare Pages
cf pages domain set your-domain.com --project-name quickbg-remover

# Vercel
vercel domains add your-domain.com
```

### 2. HTTPS 配置
- Cloudflare：自动提供 SSL
- Vercel：自动提供 SSL
- 自建服务器：使用 Let's Encrypt

### 3. CDN 配置
- Cloudflare CDN
- AWS CloudFront
- Cloudflare Images

## 成本优化

### 1. API 使用优化
- 监控 API 调用次数
- 设置用户配额限制
- 优化图片大小

### 2. 资源优化
- 启用 CDN 缓存
- 优化图片压缩
- 使用 WebP 格式

### 3. 服务器优化
- 选择合适的云服务
- 使用自动扩缩容
- 优化静态资源

---

## 支持

如果遇到部署问题，请：
1. 检查日志文件
2. 查看 GitHub Issues
3. 联系技术支持

**祝部署顺利！** 🚀