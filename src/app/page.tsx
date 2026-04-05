'use client'

import React, { useState, useCallback } from 'react'
import DropZone from '@/components/DropZone'
import ImagePreview from '@/components/ImagePreview'
import ProgressBar from '@/components/ProgressBar'
import { ImageData, ProcessingStatus } from '@/types'
import { removeBackground, saveAsPng } from '@/lib/removebg'

export default function HomePage() {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>({
    status: 'idle',
  })

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      setProcessingStatus({ status: 'uploading', progress: 10 })
      setImageData({ 
        original: URL.createObjectURL(file), 
        name: file.name, 
        size: Math.round(file.size / 1024) 
      })

      // Convert to base64 for API
      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(',')[1]
        setProcessingStatus({ status: 'processing', progress: 30 })

        // Remove background - using environment variable
        const apiKey = process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY || ''
        const result = await removeBackground(base64, apiKey)
        
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
  }, [])

  const handleDownload = useCallback(() => {
    if (imageData?.processed) {
      saveAsPng(
        imageData.processed, 
        imageData.name ? `no-background-${imageData.name.replace(/\.[^/.]+$/, '')}.png` : 'no-background.png'
      )
    }
  }, [imageData])

  const handleReset = useCallback(() => {
    setImageData(null)
    setProcessingStatus({ status: 'idle' })
  }, [])

  const canDownload = !!(processingStatus.status === 'completed' && imageData?.processed)
  const isProcessing = processingStatus.status === 'uploading' || processingStatus.status === 'processing'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✂️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">QuickBG Remover</h1>
                <p className="text-sm text-gray-500">快速图片背景移除工具</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <span>🔒</span>
                <span>安全隐私</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>⚡</span>
                <span>快速处理</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>📱</span>
                <span>移动端支持</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload and Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drop Zone */}
            <DropZone 
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
            />

            {/* Progress */}
            {processingStatus.status !== 'idle' && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <ProgressBar 
                  status={processingStatus.status} 
                  progress={processingStatus.progress} 
                />
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
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">为什么选择我们？</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span>⚡</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">快速处理</h4>
                    <p className="text-sm text-gray-600">AI驱动，秒级完成背景移除</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span>🔒</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">安全可靠</h4>
                    <p className="text-sm text-gray-600">浏览器本地处理，不上传服务器</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span>✨</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">简单易用</h4>
                    <p className="text-sm text-gray-600">拖拽上传，一键下载PNG格式</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>📖</span>
                <span>使用方法</span>
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>拖拽图片到上传区域或点击选择文件</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>等待AI自动移除图片背景</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>下载高质量的透明背景PNG图片</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>💡</span>
                <span>使用提示</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 建议使用人物或产品图片效果最佳</li>
                <li>• 支持复制粘贴图片到页面</li>
                <li>• 处理完成后立即下载以获得最佳质量</li>
                <li>• PNG格式支持透明背景</li>
              </ul>
            </div>

            {/* Reset Button */}
            {processingStatus.status !== 'idle' && (
              <button
                onClick={handleReset}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 font-medium"
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