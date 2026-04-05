'use client'

import React from 'react'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'
import { ImageData } from '@/types'

interface ImagePreviewProps {
  data: ImageData | null
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error'
  onDownload: () => void
  canDownload: boolean
}

export default function ImagePreview({ 
  data, 
  status, 
  onDownload, 
  canDownload 
}: ImagePreviewProps) {
  // 等待状态不显示预览区域
  if (!data || status === 'idle') {
    return (
      <div className="hidden md:flex items-center justify-center h-96 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">上传图片后预览效果</p>
          <p className="text-sm text-gray-400">支持 JPG、PNG、WebP 格式</p>
        </div>
      </div>
    )
  }

  // 错误状态
  if (status === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 text-red-600">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-xl">❌</span>
          </div>
          <div>
            <p className="font-medium text-lg">处理失败</p>
            <p className="text-sm">请重试或联系支持</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 图片对比显示 - 按照需求文档：左侧原图，右侧处理后 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 原始图片 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>原图</span>
            </h4>
            {data.size && (
              <span className="text-sm text-gray-500">{data.size} KB</span>
            )}
          </div>
          <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-64 flex items-center justify-center">
            {status === 'uploading' && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
                <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={data.original}
              alt="Original"
              className="w-full h-auto max-h-80 object-contain"
            />
          </div>
        </div>

        {/* 处理后图片 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <EyeOff className="w-4 h-4" />
              <span>处理后</span>
              {status === 'completed' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  完成
                </span>
              )}
            </h4>
            {status === 'processing' && (
              <span className="text-sm text-blue-500 animate-pulse">处理中...</span>
            )}
          </div>
          <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200 min-h-64 flex items-center justify-center">
            {data.processed ? (
              <>
                {/* 使用棋盘格背景显示透明效果 */}
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), 
                                     linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                                     linear-gradient(45deg, transparent 75%, #ccc 75%), 
                                     linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />
                <img
                  src={`data:image/png;base64,${data.processed}`}
                  alt="Processed"
                  className="w-full h-auto max-h-80 object-contain relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500">正在移除背景...</p>
              </div>
            )}
          </div>
          
          {/* 质量提示 - 按照需求文档：显示质量评分 */}
          {status === 'completed' && data.quality && (
            <div className="flex items-center justify-center space-x-2 bg-green-50 rounded-lg px-3 py-2">
              <span className="text-sm text-green-700">
                {data.quality === 'excellent' && '✨ 质量评分：优秀'}
                {data.quality === 'good' && '👍 质量评分：良好'}
                {data.quality === 'average' && '⚠️ 质量评分：一般'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}