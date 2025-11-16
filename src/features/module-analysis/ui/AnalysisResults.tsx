/**
 * Analysis Results Component
 */

import { Button } from '../../../shared/ui/Button/Button';
import { MetricsCards } from './MetricsCards';
import { ModuleList } from './ModuleList';
import { HotspotList } from './HotspotList';
import { formatDate } from '../../../shared/utils/format';
import type { Analysis } from '../../../shared/types/api.types';

interface AnalysisResultsProps {
  analysis: Analysis;
  onViewGraph?: () => void;
  onExport?: () => void;
}

export function AnalysisResults({ analysis, onViewGraph, onExport }: AnalysisResultsProps) {
  const { projection, timestamp } = analysis;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
          <p className="text-sm text-gray-600 mt-1">
            Analyzed on {formatDate(timestamp)}
          </p>
        </div>
        <div className="flex gap-2">
          {onViewGraph && (
            <Button onClick={onViewGraph} variant="primary">
              View Graph
            </Button>
          )}
          {onExport && (
            <Button onClick={onExport} variant="secondary">
              Export ▼
            </Button>
          )}
        </div>
      </div>

      {/* Metrics */}
      <MetricsCards metadata={projection.metadata} />

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ModuleList modules={projection.modules} />
        </div>
        <div>
          <HotspotList modules={projection.modules} />
        </div>
      </div>
    </div>
  );
}


