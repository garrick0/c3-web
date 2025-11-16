/**
 * Hotspot List Component
 */

import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/ui/Card/Card';
import { Badge } from '../../../shared/ui/Badge/Badge';
import type { Module } from '../../../shared/types/api.types';

interface HotspotListProps {
  modules: Module[];
}

export function HotspotList({ modules }: HotspotListProps) {
  // Find hotspots (most depended-upon modules)
  const hotspots = [...modules]
    .sort((a, b) => b.dependents.length - a.dependents.length)
    .slice(0, 5);

  // Find highly coupled modules
  const highlyCoupled = [...modules]
    .filter((m) => m.dependencies.length > 5)
    .sort((a, b) => b.dependencies.length - a.dependencies.length);

  // Check for circular dependencies (simplified check)
  const hasCycles = modules.some((module) =>
    module.dependencies.some((depId) => {
      const depModule = modules.find((m) => m.id === depId);
      return depModule?.dependencies.includes(module.id);
    })
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🔥 Hotspots (Most Used)</CardTitle>
        </CardHeader>
        <CardContent>
          {hotspots.length > 0 ? (
            <div className="space-y-2">
              {hotspots.map((module, index) => (
                <div key={module.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-400">{index + 1}</span>
                    <span className="font-medium">{module.name}</span>
                  </div>
                  <Badge variant="info">
                    Used by {module.dependents.length} {module.dependents.length === 1 ? 'module' : 'modules'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No hotspots detected</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>⚠️ High Coupling</CardTitle>
        </CardHeader>
        <CardContent>
          {highlyCoupled.length > 0 ? (
            <div className="space-y-2">
              {highlyCoupled.map((module) => (
                <div key={module.id} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="font-medium">{module.name}</span>
                  <Badge variant="warning">
                    {module.dependencies.length} dependencies
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <span>✅</span>
              <span className="text-sm">No highly coupled modules</span>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔄 Circular Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          {hasCycles ? (
            <div className="flex items-center gap-2 text-red-600">
              <span>❌</span>
              <span className="text-sm">Circular dependencies detected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <span>✅</span>
              <span className="text-sm">No circular dependencies detected</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

