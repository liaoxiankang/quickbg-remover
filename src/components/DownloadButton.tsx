'use client'

import React from 'react'
import { Download } from 'lucide-react'

interface DownloadButtonProps {
  onDownload: () => void
  fileName: string
}

export default function DownloadButton({ onDownload, fileName }: DownloadButtonProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="text-center space-y-4">
        {/* 成功提示 */}
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <span className="text-2xl">✅</span>
          <span className="text-lg font-medium">处理完成！</span>
        </div>
        
        {/* 质量提示 - 按照需求文档 */}
        <div className="bg-green-50 rounded-lg px-4 py-2 inline-block">
          <span className="text-sm text-green-700">
            🎉 图片已处理完成，可以下载高质量的PNG格式图片
          </span>
        </div>
        
        {/* 下载按钮 */}
        <button
          onClick={onDownload}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <Download className="w-5 h-5" />
          <span>下载 PNG 图片</span>
        </button>
        
        {/* 文件名提示 */}
        <p className="text-xs text-gray-500">
          文件名：{fileName}
        </p>
      </div>
    </div>
  )
}