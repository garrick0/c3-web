/**
 * Module Analysis Page
 */

import { useState } from 'react';
import { AnalysisForm } from '../../features/module-analysis/ui/AnalysisForm';
import { AnalysisResults } from '../../features/module-analysis/ui/AnalysisResults';
import { useAnalyzeModules } from '../../features/module-analysis/hooks/useAnalysis';
import { useExportAnalysis } from '../../features/module-analysis/hooks/useExport';
import { useAnalysisStore } from '../../shared/store/analysisStore';
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary/ErrorBoundary';
import { useNavigate } from 'react-router-dom';

export function ModuleAnalysisPage() {
  const navigate = useNavigate();
  const { currentAnalysis, isAnalyzing } = useAnalysisStore();
  const { mutate: analyze } = useAnalyzeModules();
  const { mutate: exportAnalysis } = useExportAnalysis();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: 'json' | 'graphml' | 'svg' | 'markdown') => {
    if (currentAnalysis) {
      exportAnalysis({ id: currentAnalysis.id, format });
      setShowExportMenu(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Module Dependency Analysis</h1>
          <p className="text-gray-600 mt-2">
            Analyze your codebase to understand module dependencies and architecture
          </p>
        </div>

        <div className="space-y-8">
          <AnalysisForm onAnalyze={analyze} isLoading={isAnalyzing} />

          {currentAnalysis && (
            <AnalysisResults
              analysis={currentAnalysis}
              onViewGraph={() => navigate(`/projection?analysisId=${currentAnalysis.id}`)}
              onExport={() => setShowExportMenu(!showExportMenu)}
            />
          )}

          {showExportMenu && currentAnalysis && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                <h3 className="text-lg font-semibold mb-4">Export Analysis</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleExport('json')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    📄 JSON Format
                  </button>
                  <button
                    onClick={() => handleExport('graphml')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    📊 GraphML Format
                  </button>
                  <button
                    onClick={() => handleExport('svg')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    🖼️ SVG Image
                  </button>
                  <button
                    onClick={() => handleExport('markdown')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    📝 Markdown Report
                  </button>
                </div>
                <button
                  onClick={() => setShowExportMenu(false)}
                  className="mt-4 w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}


