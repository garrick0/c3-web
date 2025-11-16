/**
 * Graph Legend Component
 */

import { Card } from '../../../shared/ui/Card/Card';

export function GraphLegend() {
  const items = [
    { color: '#10b981', label: 'No dependencies' },
    { color: '#3b82f6', label: '1-2 dependencies' },
    { color: '#f59e0b', label: '3-5 dependencies' },
    { color: '#ef4444', label: '6+ dependencies' },
  ];

  return (
    <Card className="p-3">
      <h4 className="text-xs font-semibold text-gray-700 mb-2">Legend</h4>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}


