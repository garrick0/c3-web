/**
 * API Endpoints
 * Centralized API endpoint definitions
 */

export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  // Module Analysis
  ANALYZE_MODULES: '/projections/modules/analyze',
  GET_ANALYSIS: (id: string) => `/projections/modules/${id}`,
  LIST_ANALYSES: '/projections/modules',
  DELETE_ANALYSIS: (id: string) => `/projections/modules/${id}`,
  
  // Export
  EXPORT_ANALYSIS: (id: string, format: string) => `/projections/modules/${id}/export?format=${format}`,
  
  // Architecture Validation
  VALIDATE_ARCHITECTURE: '/projections/modules/validate',
  
  // Health
  HEALTH: '/health',
} as const;

