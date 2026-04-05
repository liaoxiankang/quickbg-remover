'use client'

import React, { useCallback, useState } from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { validateImageFile } from '@/lib/utils'

interface DropZoneProps {
  onFileSelect: (file: File) => void
  isProcessing: boolean
}

export default function DropZone({ onFileSelect, isProcessing }: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState<string>('')

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (isProcessing) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      const validation = validateImageFile(file)
      
      if (!validation.valid) {
        setError(validation.error || '无效的文件')
        return
      }
      
      setError('')
      onFileSelect(file)
    }
  }, [onFileSelect, isProcessing])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isProcessing) return
    
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const validation = validateImageFile(file)
      
      if (!validation.valid) {
        setError(validation.error || '无效的文件')
        return
      }
      
      setError('')
      onFileSelect(file)
    }
  }, [onFileSelect, isProcessing])

  const handlePaste = useCallback((e: ClipboardEvent) => {
    if (isProcessing) return
    
    const items = Array.from(e.clipboardData?.items || [])
    const imageItem = items.find(item => item.type.startsWith('image/'))
    
    if (imageItem) {
      const file = imageItem.getAsFile()
      if (file) {
        const validation = validateImageFile(file)
        
        if (!validation.valid) {
          setError(validation.error || '无效的文件')
          return
        }
        
        setError('')
        onFileSelect(file)
      }
    }
  }, [onFileSelect, isProcessing])

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste)
    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [handlePaste])

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
        isDragActive 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 hover:border-blue-400 bg-white'
      } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => {
        if (!isProcessing) {
          const input = document.getElementById('file-input') as HTMLInputElement
          input?.click()
        }
      }}
    >
      <input
        id="file-input"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileInput}
        className="hidden"
        disabled={isProcessing}
      />

      {isProcessing ? (
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">正在处理中...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">拖拽图片到这里</h3>
            <p className="text-gray-600">
              或者 <span className="text-blue-600 font-medium">点击选择文件</span>
            </p>
            <p className="text-sm text-gray-500">
              支持 JPG, PNG, WebP 格式，最大 10MB
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ImageIcon className="w-4 h-4" />
              <span>支持复制粘贴</span>
            </div>
            <div>•</div>
            <div className="flex items-center space-x-1">
              <span>实时预览</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-4 left-4 right-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  )
}