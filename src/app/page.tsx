'use client'

import React, { useState, useCallback } from 'react'
import { Sparkles, Zap, Shield, Users } from 'lucide-react'
import DropZone from '@/components/DropZone'
import ImagePreview from '@/components/ImagePreview'
import ProgressBar from '@/components/ProgressBar'
import { ImageData, ProcessingStatus, RemoveBgResponse } from '@/types'
import { removeBackground, saveAsPng } from '@/lib/removebg'

const B_FEATURES = [
  {
    icon: Zap,
    title: '快速处理',
    description: 'AI 驱动，秒级完成背景移除',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '浏览器本地处理，不上传服务器',
  },
  {
    icon: Users,
    title: '简单易用',
    description: '拖拽上传，一键下载PNG格式',
  },
]

export default function HomePage() {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    status: 'idle',
  })
  const [apiKey, setApiKey] = useState<string>('')

  React.useEffect(() => {
    // Check for API key in environment
    if (typeof window !== 'undefined') {
      const key = process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY || ''
      setApiKey(key)
    }
  }, [])

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      setProcessingStatus({ status: 'uploading', progress: 10 })
      setImageData({ original: URL.createObjectURL(file), name: file.name, size: Math.round(file.size / 1024) })

      // Convert to base64 for API
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1]
        setProcessingStatus({ status: 'processing', progress: 30 })

        // Remove background
        const result: RemoveBgResponse = await removeBackground(base64, apiKey)
        
        if (result.success && result.base64_image) {
          setProcessingStatus({ status: 'completed', progress: 100 })
          setImageData(prev => prev ? { ...prev, processed: result.base64_image } : null)
        } else {
          setProcessingStatus({ 
            status: 'error', 
            error: { 
              message: result.errors?.[0]?.message || '处理失败，请重试' 
            } 
          })
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setProcessingStatus({ 
        status: 'error', 
        error: { 
          message: error instanceof Error ? error.message : '上传失败' 
        } 
      })
    }
  }, [apiKey])

  const handleDownload = useCallback(() => {
    if (imageData?.processed) {
      saveAsPng(imageData.processed, imageData.name ? `${imageData.name.replace(/\.[^/.]+$/, '')}_no_bg.png` : 'background-removed.png')
    }
  }, [imageData])

  const handleReset = useCallback(() => {
    setImageData(null)
    setProcessingStatus({ status: 'idle' })
  }, [])

  const canDownload = processingStatus.status === 'completed' && imageData?.processed

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">QuickBG Remover</h1>
                <p className="text-sm text-gray-500">快速图片背景移除工具</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Shield className="w-4 h-4" />
                <span>安全隐私</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Zap className="w-4 h-4" />
                <span>快速处理</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drop Zone */}
            <DropZone 
              onFileSelect={handleFileSelect}
              isProcessing={processingStatus.status === 'uploading' || processingStatus.status === 'processing'}
            />

            {/* Progress */}
            {processingStatus.status !== 'idle' && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <ProgressBar status={processingStatus.status} progress={processingStatus.progress} />
              </div>
            )}

            {/* Image Preview */}
            <ImagePreview
              data={imageData}
              status={processingStatus.status}
              onDownload={handleDownload}
              canDownload={canDownload}
            />
          </div>

          {/* Right Column - Features and Info */}
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">为什么选择我们？</h3>
              <div className="space-y-4">
                {B_FEATURES.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-primary-600" />
                <span>使用方法</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>拖拽图片到上传区域或点击选择文件</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>等待AI自动移除图片背景</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>下载高质量的透明背景PNG图片</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span>使用提示</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 建议使用人物或产品图片效果最佳</li>
                <li>• 支持复制粘贴图片到页面</li>
                <li>• 处理完成后立即下载以获得最佳质量</li>
                <li>• PNG格式支持透明背景，适合设计使用</li>
              </ul>
            </div>

            {/* Reset Button */}
            {processingStatus.status !== 'idle' && (
              <button
                onClick={handleReset}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                重新开始
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2024 QuickBG Remover. 基于 Remove.bg API 技术支持</p>
            <p className="mt-2">本工具使用 AI 技术自动移除图片背景，处理结果仅保留在浏览器内存中</p>
          </div>
        </div>
      </footer>
    </div>
  )
}