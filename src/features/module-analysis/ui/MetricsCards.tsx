/**
 * Metrics Cards Component
 */

import { Card } from '../../../shared/ui/Card/Card';
import { formatNumber } from '../../../shared/utils/format';
import type { ProjectionMetadata } from '../../../shared/types/api.types';

interface MetricsCardsProps {
  metadata: ProjectionMetadata;
}

export function MetricsCards({ metadata }: MetricsCardsProps) {
  const metrics = [
    {
      label: 'Modules',
      value: metadata.totalModules,
      icon: '📦',
      color: 'text-blue-600',
    },
    {
      label: 'Files',
      value: metadata.totalFiles,
      icon: '📄',
      color: 'text-green-600',
    },
    {
      label: 'Dependencies',
      value: metadata.totalDependencies,
      icon: '🔗',
      color: 'text-purple-600',
    },
    {
      label: 'Avg Coupling',
      value: formatNumber(metadata.averageCoupling, 2),
      icon: '📊',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="text-center">
          <div className="text-3xl mb-2">{metric.icon}</div>
          <div className={`text-3xl font-bold ${metric.color}`}>
            {metric.value}
          </div>
          <div className="text-sm text-gray-600 mt-1">{metric.label}</div>
        </Card>
      ))}
    </div>
  );
}

