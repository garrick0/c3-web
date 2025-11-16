/**
 * Graph Controls Component
 */

import { useAnalysisStore } from '../../../shared/store/analysisStore';
import { Card } from '../../../shared/ui/Card/Card';
import type { LayoutType, ColorScheme } from '../../../shared/types/api.types';

export function GraphControls() {
  const { layout, setLayout, colorScheme, setColorScheme, filters, setFilters } = useAnalysisStore();

  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-sm mb-2">Layout</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="hierarchical"
              checked={layout === 'hierarchical'}
              onChange={(e) => setLayout(e.target.value as LayoutType)}
              className="form-radio text-primary-600"
            />
            <span className="ml-2 text-sm">Hierarchical</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="force"
              checked={layout === 'force'}
              onChange={(e) => setLayout(e.target.value as LayoutType)}
              className="form-radio text-primary-600"
            />
            <span className="ml-2 text-sm">Force-Directed</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-sm mb-2">Color By</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="dependencies"
              checked={colorScheme === 'dependencies'}
              onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
              className="form-radio text-primary-600"
            />
            <span className="ml-2 text-sm">Dependencies</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="complexity"
              checked={colorScheme === 'complexity'}
              onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
              className="form-radio text-primary-600"
            />
            <span className="ml-2 text-sm">Complexity</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-sm mb-2">Display</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showLabels}
              onChange={(e) => setFilters({ showLabels: e.target.checked })}
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2 text-sm">Show Labels</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.showMetrics}
              onChange={(e) => setFilters({ showMetrics: e.target.checked })}
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2 text-sm">Show Metrics</span>
          </label>
        </div>
      </div>
    </Card>
  );
}

