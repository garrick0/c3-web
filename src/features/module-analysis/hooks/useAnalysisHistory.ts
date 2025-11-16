/**
 * Analysis History Hook
 */

import { useQuery } from '@tanstack/react-query';
import { analysisApi } from '../api/analysis.api';
import type { ListParams } from '../../../shared/types/api.types';

export function useAnalysisHistory(params?: ListParams) {
  return useQuery({
    queryKey: ['analyses', params],
    queryFn: () => analysisApi.list(params),
    select: (response) => response.data,
  });
}

