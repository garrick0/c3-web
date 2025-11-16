/**
 * Generic API Hook
 * Provides a convenient wrapper around React Query
 */

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse } from '../types/api.types';

export function useApiQuery<TData, TError = Error>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<ApiResponse<TData>>,
  options?: Omit<UseQueryOptions<ApiResponse<TData>, TError, TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn,
    select: (response) => response.data,
    ...options,
  });
}

export function useApiMutation<TData, TVariables, TError = Error>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: Omit<UseMutationOptions<ApiResponse<TData>, TError, TVariables>, 'mutationFn'>
) {
  return useMutation({
    mutationFn,
    ...options,
  });
}

