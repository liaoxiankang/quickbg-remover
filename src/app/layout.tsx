import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QuickBG Remover - 快速图片背景移除',
  description: '免费在线图片背景移除工具，支持拖拽上传，一键去除背景，高质量PNG输出',
  keywords: '背景移除,抠图,在线工具,图片处理,透明背景',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}