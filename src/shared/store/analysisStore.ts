/**
 * Analysis Store
 * Global state management for analysis data and UI state
 */

import { create } from 'zustand';
import type {
  Analysis,
  AnalysisHistoryItem,
  ColorScheme,
  GraphFilters,
  LayoutType,
} from '../types/api.types';

interface AnalysisState {
  // Current analysis
  currentAnalysis: Analysis | null;
  setCurrentAnalysis: (analysis: Analysis | null) => void;

  // Analysis history
  history: AnalysisHistoryItem[];
  addToHistory: (item: AnalysisHistoryItem) => void;
  clearHistory: () => void;

  // Graph state
  selectedNode: string | null;
  setSelectedNode: (nodeId: string | null) => void;

  highlightedNodes: Set<string>;
  setHighlightedNodes: (nodeIds: Set<string>) => void;

  // UI state
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;

  // Graph layout preferences
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;

  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;

  // Filters
  filters: GraphFilters;
  setFilters: (filters: Partial<GraphFilters>) => void;
  resetFilters: () => void;
}

const defaultFilters: GraphFilters = {
  showLabels: true,
  showMetrics: false,
  showPaths: false,
  includeTests: false,
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  // Current analysis
  currentAnalysis: null,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

  // Analysis history
  history: [],
  addToHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history.filter((h) => h.id !== item.id)].slice(0, 50), // Keep last 50
    })),
  clearHistory: () => set({ history: [] }),

  // Graph state
  selectedNode: null,
  setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),

  highlightedNodes: new Set(),
  setHighlightedNodes: (nodeIds) => set({ highlightedNodes: nodeIds }),

  // UI state
  isAnalyzing: false,
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),

  // Graph layout preferences
  layout: 'hierarchical',
  setLayout: (layout) => set({ layout }),

  colorScheme: 'dependencies',
  setColorScheme: (scheme) => set({ colorScheme: scheme }),

  // Filters
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));


