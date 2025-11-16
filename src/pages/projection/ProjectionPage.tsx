/**
 * Projection Page - Enhanced with Interactive Graph
 */

import { useSearchParams } from 'react-router-dom';
import { useAnalysisStore } from '../../shared/store/analysisStore';
import { useAnalysis } from '../../features/module-analysis/hooks/useAnalysis';
import { InteractiveGraph } from '../../features/graph-visualization/ui/InteractiveGraph';
import { GraphControls } from '../../features/graph-visualization/ui/GraphControls';
import { GraphLegend } from '../../features/graph-visualization/ui/GraphLegend';
import { NodeDetails } from '../../features/graph-visualization/ui/NodeDetails';
import { LoadingSpinner } from '../../shared/ui/Spinner/Spinner';
import { ErrorMessage } from '../../shared/ui/ErrorBoundary/ErrorBoundary';

export function ProjectionPage() {
  const [searchParams] = useSearchParams();
  const analysisId = searchParams.get('analysisId');
  const { currentAnalysis } = useAnalysisStore();
  
  // If analysisId is provided, fetch that analysis
  const { data: fetchedAnalysis, isLoading, error } = useAnalysis(analysisId || '');
  
  // Use either the fetched analysis or the current analysis from store
  const analysis = analysisId ? fetchedAnalysis : currentAnalysis;

  if (isLoading) {
    return <LoadingSpinner message="Loading analysis..." />;
  }

  if (error) {
    return (
      <div className="container">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Analysis Available</h2>
          <p className="text-gray-600">
            Run an analysis from the <a href="/analysis" className="text-primary-600 hover:underline">Analysis page</a> to view the dependency graph
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Module Dependency Graph</h1>
        <p className="text-gray-600 mt-2">
          Interactive visualization of module dependencies
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Controls */}
        <div className="col-span-12 lg:col-span-2">
          <GraphControls />
          <div className="mt-4">
            <GraphLegend />
          </div>
        </div>

        {/* Graph */}
        <div className="col-span-12 lg:col-span-10 relative">
          <InteractiveGraph analysis={analysis} />
          <NodeDetails analysis={analysis} />
        </div>
      </div>
    </div>
  );
}
