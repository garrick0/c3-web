/**
 * API Types
 * TypeScript interfaces for API requests and responses
 */

export type AggregationLevel = 'directory' | 'top-level' | 'package';
export type ExportFormat = 'json' | 'graphml' | 'svg' | 'markdown';
export type LayoutType = 'hierarchical' | 'force' | 'circular';
export type ColorScheme = 'dependencies' | 'complexity' | 'layer' | 'default';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Analysis Configuration
export interface AnalysisConfig {
  rootPath: string;
  config: {
    aggregationLevel: AggregationLevel;
    includeTests?: boolean;
    includePrivate?: boolean;
    excludePatterns?: string[];
  };
}

// Module
export interface Module {
  id: string;
  name: string;
  path: string;
  files: string[];
  dependencies: string[];
  dependents: string[];
  metrics: ModuleMetrics;
}

export interface ModuleMetrics {
  fileCount: number;
  dependencyCount: number;
  dependentCount: number;
  complexity?: number;
  coupling?: number;
}

// Analysis Result
export interface Analysis {
  id: string;
  timestamp: string;
  config: {
    rootPath: string;
    aggregationLevel: AggregationLevel;
  };
  projection: ModuleProjection;
}

export interface ModuleProjection {
  modules: Module[];
  metadata: ProjectionMetadata;
}

export interface ProjectionMetadata {
  totalModules: number;
  totalFiles: number;
  totalDependencies: number;
  averageCoupling: number;
  maxDepth: number;
  timestamp: string;
}

// Architecture Validation
export interface ValidationConfig {
  rootPath: string;
  rules?: ValidationRule[];
}

export interface ValidationRule {
  name: string;
  description: string;
  enabled: boolean;
}

export interface Validation {
  score: number;
  grade: string;
  checks: Record<string, ValidationCheck>;
  layers: LayerSummary[];
  violations: Violation[];
  recommendations: string[];
}

export interface ValidationCheck {
  name: string;
  passed: boolean;
  score: number;
  message: string;
  details?: string;
}

export interface LayerSummary {
  name: string;
  moduleCount: number;
  description: string;
  color: string;
}

export interface Violation {
  type: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  source: string;
  target?: string;
}

// Export
export interface Export {
  format: ExportFormat;
  content: string;
  filename: string;
  size: number;
}

// Analysis List
export interface AnalysisList {
  analyses: AnalysisHistoryItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AnalysisHistoryItem {
  id: string;
  rootPath: string;
  projectName: string;
  timestamp: string;
  moduleCount: number;
  score?: number;
}

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'timestamp' | 'score' | 'modules';
  sortOrder?: 'asc' | 'desc';
}

// Graph Visualization
export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  size: number;
  color: string;
  x?: number;
  y?: number;
  metadata: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  weight?: number;
  metadata?: Record<string, any>;
}

export interface GraphFilters {
  showLabels?: boolean;
  showMetrics?: boolean;
  showPaths?: boolean;
  minDependencies?: number;
  maxDependencies?: number;
  includeTests?: boolean;
}


