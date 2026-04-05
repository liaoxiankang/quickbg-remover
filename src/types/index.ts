export interface ApiError {
  message: string;
  type?: string;
  errors?: string[];
}

export interface ProcessingStatus {
  status: 'idle' | 'uploading' | 'processing' | 'completed' | 'error';
  progress?: number;
  error?: ApiError;
}

export interface ImageData {
  original: string;
  processed?: string;
  name?: string;
  size?: number;
  quality?: 'excellent' | 'good' | 'average';
}

export interface RemoveBgResponse {
  success: boolean;
  base64_image?: string;
  errors?: ApiError[];
}

export interface AppStats {
  monthlyUsage: number;
  monthlyLimit: number;
}