/**
 * Error Boundary Component
 */

import { Component, ReactNode } from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <Card className="max-w-md w-full">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
              <p className="text-gray-600 mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <Button onClick={this.handleReset} variant="primary">
                Try again
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <Card className="border-red-200 bg-red-50">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-2xl mr-3">❌</div>
        <div>
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>
      </div>
    </Card>
  );
}

