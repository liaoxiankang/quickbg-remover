import { validateImageFile, formatFileSize, generateId } from '../src/lib/utils'

describe('Utility Functions', () => {
  describe('validateImageFile', () => {
    it('should accept valid image files', () => {
      const validFiles = [
        new File([], 'test.jpg', { type: 'image/jpeg' }),
        new File([], 'test.png', { type: 'image/png' }),
        new File([], 'test.webp', { type: 'image/webp' }),
      ]

      validFiles.forEach(file => {
        const result = validateImageFile(file)
        expect(result.valid).toBe(true)
        expect(result.error).toBeUndefined()
      })
    })

    it('should reject invalid image types', () => {
      const invalidFiles = [
        new File([], 'test.gif', { type: 'image/gif' }),
        new File([], 'test.pdf', { type: 'application/pdf' }),
        new File([], 'test.txt', { type: 'text/plain' }),
      ]

      invalidFiles.forEach(file => {
        const result = validateImageFile(file)
        expect(result.valid).toBe(false)
        expect(result.error).toBeDefined()
        expect(result.error?.length).toBeGreaterThan(0)
      })
    })

    it('should reject files larger than 10MB', () => {
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' })
      const result = validateImageFile(largeFile)
      expect(result.valid).toBe(false)
      expect(result.error).toBe('图片大小不能超过 10MB')
    })
  })

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1024 * 1024)).toBe('1 MB')
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
      expect(id1.length).toBeGreaterThan(5)
      expect(id2.length).toBeGreaterThan(5)
    })
  })
})