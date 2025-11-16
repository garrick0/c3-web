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
  private baseURL = '';

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
    const response = await this.request<any>(ENDPOINTS.ANALYZE_MODULES, {
      method: 'POST',
      body: JSON.stringify(config),
    });

    // Transform backend response to match frontend expectations
    const transformModule = (module: any) => ({
      id: module.id,
      name: module.name,
      path: module.path,
      files: module.files || [],
      dependencies: module.dependencies || [],
      dependents: module.dependents || [],
      metrics: {
        fileCount: module.fileCount || module.metrics?.fileCount || 0,
        dependencyCount: module.dependencyCount || module.metrics?.dependencyCount || 0,
        dependentCount: module.dependentCount || module.metrics?.dependentCount || 0,
        complexity: module.metrics?.complexity || 0,
        coupling: module.metrics?.coupling || 0,
      },
    });

    return {
      ...response,
      data: {
        id: response.data.analysisId,
        timestamp: response.data.analyzedAt || new Date().toISOString(),
        config: {
          rootPath: config.rootPath,
          aggregationLevel: config.config.aggregationLevel,
        },
        projection: {
          modules: (response.data.modules || []).map(transformModule),
          metadata: {
            totalModules: response.data.summary?.totalModules || 0,
            totalFiles: response.data.summary?.totalFiles || 0,
            totalDependencies: response.data.summary?.totalDependencies || 0,
            averageCoupling: response.data.summary?.averageCoupling || 0,
            maxDepth: response.data.summary?.maxDepth || 0,
            timestamp: response.data.analyzedAt || new Date().toISOString(),
          },
        },
      },
    };
  }

  /**
   * Get a specific analysis by ID
   */
  async getAnalysis(id: string): Promise<ApiResponse<Analysis>> {
    const response = await this.request<any>(ENDPOINTS.GET_ANALYSIS(id));

    // Transform backend response to match frontend expectations
    if (response.data && !response.data.projection) {
      const transformModule = (module: any) => ({
        id: module.id,
        name: module.name,
        path: module.path,
        files: module.files || [],
        dependencies: module.dependencies || [],
        dependents: module.dependents || [],
        metrics: {
          fileCount: module.fileCount || module.metrics?.fileCount || 0,
          dependencyCount: module.dependencyCount || module.metrics?.dependencyCount || 0,
          dependentCount: module.dependentCount || module.metrics?.dependentCount || 0,
          complexity: module.metrics?.complexity || 0,
          coupling: module.metrics?.coupling || 0,
        },
      });

      return {
        ...response,
        data: {
          id: response.data.analysisId || id,
          timestamp: response.data.analyzedAt || new Date().toISOString(),
          config: response.data.config || {
            rootPath: response.data.rootPath || '',
            aggregationLevel: 'top-level' as const,
          },
          projection: {
            modules: (response.data.modules || []).map(transformModule),
            metadata: {
              totalModules: response.data.summary?.totalModules || 0,
              totalFiles: response.data.summary?.totalFiles || 0,
              totalDependencies: response.data.summary?.totalDependencies || 0,
              averageCoupling: response.data.summary?.averageCoupling || 0,
              maxDepth: response.data.summary?.maxDepth || 0,
              timestamp: response.data.analyzedAt || new Date().toISOString(),
            },
          },
        },
      };
    }

    return response;
  }

  /**
   * List all analyses
   */
  async listAnalyses(params?: ListParams): Promise<ApiResponse<AnalysisList>> {
    const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
    const response = await this.request<any>(`${ENDPOINTS.LIST_ANALYSES}${query}`);

    // Transform backend response to match frontend expectations
    if (response.data?.analyses) {
      return {
        ...response,
        data: {
          analyses: response.data.analyses.map((analysis: any) => ({
            id: analysis.analysisId || analysis.id,
            timestamp: analysis.createdAt || analysis.timestamp || new Date().toISOString(),
            projectName: analysis.rootPath?.split('/').filter(Boolean).pop() || 'Unknown',
            rootPath: analysis.rootPath || '',
            moduleCount: analysis.moduleCount || 0,
            config: {
              rootPath: analysis.rootPath || '',
              aggregationLevel: 'top-level' as const,
            },
          })),
          total: response.data.total || response.data.analyses.length,
        },
      };
    }

    return response;
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
  const response = await fetch(endpoint, {
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
