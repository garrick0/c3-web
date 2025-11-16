/**
 * Analysis Hook
 * React Query hooks for module analysis
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { analysisApi } from '../api/analysis.api';
import { useAnalysisStore } from '../../../shared/store/analysisStore';
import type { AnalysisConfig } from '../../../shared/types/api.types';

export function useAnalyzeModules() {
  const queryClient = useQueryClient();
  const { setCurrentAnalysis, setIsAnalyzing, addToHistory } = useAnalysisStore();

  return useMutation({
    mutationFn: (config: AnalysisConfig) => analysisApi.analyze(config),
    onMutate: () => {
      setIsAnalyzing(true);
      toast.loading('Analyzing codebase...', { id: 'analyze' });
    },
    onSuccess: (response) => {
      const analysis = response.data;
      setCurrentAnalysis(analysis);
      addToHistory({
        id: analysis.id,
        rootPath: analysis.config.rootPath,
        projectName: analysis.config.rootPath.split('/').filter(Boolean).pop() || 'Unknown',
        timestamp: analysis.timestamp,
        moduleCount: analysis.projection.metadata.totalModules,
      });
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      toast.success('Analysis complete!', { id: 'analyze' });
    },
    onError: (error: Error) => {
      toast.error(`Analysis failed: ${error.message}`, { id: 'analyze' });
    },
    onSettled: () => {
      setIsAnalyzing(false);
    },
  });
}

export function useAnalysis(id: string) {
  return useQuery({
    queryKey: ['analysis', id],
    queryFn: () => analysisApi.get(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => analysisApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analyses'] });
      toast.success('Analysis deleted');
    },
    onError: (error: Error) => {
      toast.error(`Delete failed: ${error.message}`);
    },
  });
}

