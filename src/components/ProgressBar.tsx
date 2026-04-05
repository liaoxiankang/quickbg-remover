'use client'

import React from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface ProgressBarProps {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error'
  progress?: number
}

export default function ProgressBar({ status, progress }: ProgressBarProps) {
  if (status === 'idle') {
    return null
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'processing':
        return <Loader2 className="w-4 h-4 animate-spin" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return '正在上传图片...'
      case 'processing':
        return '正在移除背景...'
      case 'completed':
        return '处理完成！'
      case 'error':
        return '处理失败'
      default:
        return ''
    }
  }

  const getProgress = () => {
    if (status === 'uploading') return progress || 20
    if (status === 'processing') return progress || 50
    if (status === 'completed') return 100
    if (status === 'error') return 0
    return 0
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className="text-sm font-medium text-gray-700">
          {getStatusText()}
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${
            status === 'completed' 
              ? 'bg-green-500' 
              : status === 'error'
              ? 'bg-red-500'
              : 'bg-primary-500'
          }`}
          style={{ width: `${getProgress()}%` }}
        />
      </div>
      
      {status === 'completed' && (
        <p className="text-sm text-green-600 bg-green-50 rounded px-2 py-1">
          ✓ 图片已处理完成，可以下载高质量的PNG格式图片
        </p>
      )}
    </div>
  )
}