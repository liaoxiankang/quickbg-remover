# QuickBG Remover - 快速图片背景移除工具

一个基于 Next.js 和 Remove.bg API 的现代化图片背景移除网站，支持拖拽上传、实时预览、一键下载PNG格式结果。

## ✨ 功能特性

- 🚀 **快速处理** - AI 驱动，秒级完成背景移除
- 🎯 **高质量输出** - PNG 格式透明背景，完美支持设计需求
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **现代UI** - 基于 Tailwind CSS 的优雅界面
- 🔒 **安全隐私** - 处理仅在浏览器内存中完成，不上传服务器
- 🖱️ **多种上传** - 支持拖拽、点击、复制粘贴多种上传方式
- 💫 **实时预览** - 原图与处理后结果对比显示
- ⚡ **一键下载** - 直接下载高质量PNG格式图片

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

复制环境变量模板并配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加你的 Remove.bg API 密钥：

```env
REMOVE_BG_API_KEY=your_remove_bg_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 🛠️ 技术栈

- **前端框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **API**: Remove.bg API
- **部署**: Cloudflare Pages / Vercel / Netlify

## 📁 项目结构

```
background-remover/
├── public/                 # 静态资源
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # 全局样式
│   │   ├── layout.tsx     # 布局组件
│   │   └── page.tsx       # 主页面
│   ├── components/        # React 组件
│   │   ├── DropZone.tsx   # 拖拽上传组件
│   │   ├── ImagePreview.tsx # 图片预览组件
│   │   └── ProgressBar.tsx # 进度条组件
│   ├── lib/               # 工具函数
│   │   ├── removebg.ts   # Remove.bg API 封装
│   │   └── utils.ts      # 通用工具函数
│   └── types/             # TypeScript 类型定义
│       └── index.ts
├── package.json
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🔧 API 配置

### Remove.bg API 密钥获取

1. 访问 [Remove.bg 官网](https://www.remove.bg)
2. 注册账号并获取 API 密钥
3. 将密钥添加到 `.env.local` 文件的 `REMOVE_BG_API_KEY` 字段

### API 配额管理

- 免费用户：每月 50 张图片处理
- 付费用户：根据套餐提供更多配额
- 错误处理：优雅处理 API 限制和错误

## 🚀 部署指南

### Cloudflare Pages 部署

1. 推送代码到 Git 仓库
2. 在 Cloudflare Pages 中连接仓库
3. 配置环境变量：
   ```
   REMOVE_BG_API_KEY=your_api_key
   NEXT_PUBLIC_APP_URL=https://your-domain.pages.dev
   ```
4. 自动部署完成

### Vercel 部署

1. 推送代码到 Git 仓库
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 自动部署

### 其他部署平台

- **Netlify**: 支持 Next.js，配置环境变量即可
- **Railway**: 一键部署，支持环境变量
- **自建服务器**: 使用 PM2 部署 Node.js 应用

## 🔒 安全考虑

- **隐私保护**: 图片仅在浏览器内存中处理，不上传到任何服务器
- **API 密钥安全**: 通过环境变量管理，避免硬编码
- **文件验证**: 严格限制文件类型和大小
- **错误处理**: 优雅处理各种异常情况

## 🎨 自定义配置

### 品牌定制

修改 `src/app/page.tsx` 中的品牌信息和颜色方案。

### 样式定制

编辑 `tailwind.config.js` 和 `src/app/globals.css` 来自定义样式。

### 功能扩展

- 添加批量处理功能
- 集成用户系统
- 添加更多图片编辑功能
- 支持更多输出格式

## 📊 性能优化

- **图片压缩**: 自动优化上传图片大小
- **缓存策略**: 合理配置浏览器缓存
- **CDN 加速**: 使用 Cloudflare CDN 加速资源加载
- **代码分割**: Next.js 自动代码分割

## 🐛 故障排除

### 常见问题

1. **API 调用失败**
   - 检查 API 密钥是否正确
   - 确认 API 配额是否充足
   - 查看网络连接

2. **图片处理失败**
   - 检查图片格式是否支持
   - 确认图片大小是否在限制内
   - 重试上传

3. **下载失败**
   - 检查浏览器下载设置
   - 确认图片处理完成
   - 尝试右键保存图片

### 开发调试

```bash
# 查看详细错误信息
npm run dev

# 检查 TypeScript 错误
npm run lint

# 分析构建大小
npm run analyze
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

- 项目主页: [GitHub Repository]
- 问题反馈: [Issues]
- 文档: [Wiki]

---

**享受快速、便捷的图片背景移除体验！** 🎉