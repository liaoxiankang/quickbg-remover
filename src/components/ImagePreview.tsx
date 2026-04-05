'use client'

import React from 'react'
import { Download, Eye, EyeOff } from 'lucide-react'
import { ImageData } from '@/types'
import { cn } from '@/lib/utils'

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
  if (!data || status === 'idle') {
    return (
      <div className="hidden md:flex items-center justify-center h-96 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-center space-y-2">
          <Eye className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-500">上传图片后预览效果</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Original Image */}
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
          <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={data.original}
              alt="Original"
              className="w-full h-auto max-h-80 object-contain"
            />
            {status === 'uploading' && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Processed Image */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <EyeOff className="w-4 h-4" />
              <span>处理后</span>
              {status === 'completed' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  完成
                </span>
              )}
            </h4>
            {status === 'processing' && (
              <span className="text-sm text-gray-500">处理中...</span>
            )}
          </div>
          <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            {data.processed ? (
              <>
                <img
                  src={`data:image/png;base64,${data.processed}`}
                  alt="Processed"
                  className="w-full h-auto max-h-80 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </>
            ) : (
              <div className="flex items-center justify-center h-80 bg-gray-100">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-gray-500">正在移除背景...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Download Button */}
      {canDownload && data.processed && (
        <div className="flex justify-center pt-4">
          <button
            onClick={onDownload}
            className="gradient-button flex items-center space-x-2 px-6 py-3 text-lg"
          >
            <Download className="w-5 h-5" />
            <span>下载 PNG 图片</span>
          </button>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-600">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm font-bold">!</span>
            </div>
            <span>处理失败，请重试</span>
          </div>
        </div>
      )}

      {/* File Info */}
      {data.name && (
        <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
          <p>文件名: {data.name}</p>
        </div>
      )}
    </div>
  )
}