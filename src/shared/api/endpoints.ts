/**
 * API Endpoints
 * Centralized API endpoint definitions
 */

export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  // Module Analysis
  ANALYZE_MODULES: '/api/projections/modules/analyze',
  GET_ANALYSIS: (id: string) => `/api/projections/modules/${id}`,
  LIST_ANALYSES: '/api/projections/modules',
  DELETE_ANALYSIS: (id: string) => `/api/projections/modules/${id}`,
  
  // Export
  EXPORT_ANALYSIS: (id: string, format: string) => `/api/projections/modules/${id}/export?format=${format}`,
  
  // Architecture Validation
  VALIDATE_ARCHITECTURE: '/api/projections/modules/validate',
  
  // Health
  HEALTH: '/api/health',
} as const;

