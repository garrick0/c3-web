/**
 * Analysis API
 * API functions for module analysis
 */

import { apiClient } from '../../../shared/api/client';
import type {
  AnalysisConfig,
  ExportFormat,
  ListParams,
  ValidationConfig,
} from '../../../shared/types/api.types';

export const analysisApi = {
  analyze: (config: AnalysisConfig) => apiClient.analyzeModules(config),
  
  get: (id: string) => apiClient.getAnalysis(id),
  
  list: (params?: ListParams) => apiClient.listAnalyses(params),
  
  delete: (id: string) => apiClient.deleteAnalysis(id),
  
  export: (id: string, format: ExportFormat) => apiClient.exportAnalysis(id, format),
  
  validate: (config: ValidationConfig) => apiClient.validateArchitecture(config),
};

