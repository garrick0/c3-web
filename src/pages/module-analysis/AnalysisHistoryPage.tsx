/**
 * Analysis History Page
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisHistory } from '../../features/module-analysis/hooks/useAnalysisHistory';
import { useDeleteAnalysis } from '../../features/module-analysis/hooks/useAnalysis';
import { Card } from '../../shared/ui/Card/Card';
import { Badge } from '../../shared/ui/Badge/Badge';
import { Button } from '../../shared/ui/Button/Button';
import { LoadingSpinner } from '../../shared/ui/Spinner/Spinner';
import { ErrorMessage } from '../../shared/ui/ErrorBoundary/ErrorBoundary';
import { formatDate } from '../../shared/utils/format';

export function AnalysisHistoryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useAnalysisHistory();
  const { mutate: deleteAnalysis } = useDeleteAnalysis();

  if (isLoading) return <LoadingSpinner message="Loading history..." />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return null;

  const filteredAnalyses = data.analyses.filter((analysis) =>
    analysis.projectName.toLowerCase().includes(search.toLowerCase()) ||
    analysis.rootPath.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
          <p className="text-gray-600 mt-2">
            Browse and manage your past analyses
          </p>
        </div>
        <Button onClick={() => navigate('/analysis')} variant="primary">
          New Analysis
        </Button>
      </div>

      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search analyses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input max-w-md"
          />
        </div>

        {filteredAnalyses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modules
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAnalyses.map((analysis) => (
                  <tr key={analysis.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(analysis.timestamp)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-medium text-gray-900">{analysis.projectName}</div>
                      <div className="text-gray-500 text-xs">{analysis.rootPath}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="info">{analysis.moduleCount}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => navigate(`/analysis/${analysis.id}`)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete this analysis?')) {
                            deleteAnalysis(analysis.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {search ? 'No analyses match your search' : 'No analyses yet'}
          </div>
        )}
      </Card>
    </div>
  );
}

