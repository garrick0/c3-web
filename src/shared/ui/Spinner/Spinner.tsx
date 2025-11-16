/**
 * Spinner Component
 */

import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div
        className={clsx(
          'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
          sizeStyles[size]
        )}
      />
    </div>
  );
}

export function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="lg" />
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
}


