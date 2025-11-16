/**
 * Enhanced API Client
 * Handles all API communication with type safety and error handling
 */

import { ENDPOINTS } from './endpoints';
import type {
  ApiResponse,
  Analysis,
  AnalysisConfig,
  AnalysisList,
  Export,
  ExportFormat,
  ListParams,
  Validation,
  ValidationConfig,
} from '../types/api.types';

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL = ENDPOINTS.HEALTH.replace('/health', '');

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.error?.code || 'UNKNOWN_ERROR',
          data.error?.message || 'An unknown error occurred',
          data.error?.details
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network request failed'
      );
    }
  }

  /**
   * Health Check
   */
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.request(ENDPOINTS.HEALTH);
  }

  /**
   * Analyze a codebase
   */
  async analyzeModules(config: AnalysisConfig): Promise<ApiResponse<Analysis>> {
    return this.request(ENDPOINTS.ANALYZE_MODULES, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  /**
   * Get a specific analysis by ID
   */
  async getAnalysis(id: string): Promise<ApiResponse<Analysis>> {
    return this.request(ENDPOINTS.GET_ANALYSIS(id));
  }

  /**
   * List all analyses
   */
  async listAnalyses(params?: ListParams): Promise<ApiResponse<AnalysisList>> {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    return this.request(`${ENDPOINTS.LIST_ANALYSES}${query}`);
  }

  /**
   * Delete an analysis
   */
  async deleteAnalysis(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return this.request(ENDPOINTS.DELETE_ANALYSIS(id), {
      method: 'DELETE',
    });
  }

  /**
   * Export an analysis in a specific format
   */
  async exportAnalysis(id: string, format: ExportFormat): Promise<ApiResponse<Export>> {
    return this.request(ENDPOINTS.EXPORT_ANALYSIS(id, format));
  }

  /**
   * Validate architecture
   */
  async validateArchitecture(config: ValidationConfig): Promise<ApiResponse<Validation>> {
    return this.request(ENDPOINTS.VALIDATE_ARCHITECTURE, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export for backwards compatibility
export async function apiRequest<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${ENDPOINTS.HEALTH.replace('/health', '')}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
