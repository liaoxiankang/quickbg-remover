import { RemoveBgResponse, ApiError } from '@/types'

const API_BASE_URL = 'https://api.remove.bg/v1.0/removebg'

export async function removeBackground(
  imageBase64: string,
  apiKey: string
): Promise<RemoveBgResponse> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_file_b64: imageBase64,
        size: 'auto',
        format: 'png',
      }),
    })

    if (!response.ok) {
      const errorData: ApiError = await response.json()
      return {
        success: false,
        errors: [errorData],
      }
    }

    const blob = await response.blob()
    const base64 = await blobToBase64(blob)
    
    return {
      success: true,
      base64_image: base64,
    }
  } catch (error) {
    console.error('Remove.bg API error:', error)
    return {
      success: false,
      errors: [
        {
          message: error instanceof Error ? error.message : '处理图片时发生未知错误',
        },
      ],
    }
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      resolve(result.split(',')[1]) // Remove data:image/png;base64, prefix
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export function saveAsPng(base64: string, filename: string): void {
  const link = document.createElement('a')
  link.href = `data:image/png;base64,${base64}`
  link.download = filename || 'background-removed.png'
  link.click()
}