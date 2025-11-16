/**
 * Common Types
 * Shared type definitions across the application
 */

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
  isLoading: boolean;
  error: Error | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

