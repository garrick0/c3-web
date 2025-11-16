/**
 * Node Details Panel Component
 */

import { useAnalysisStore } from '../../../shared/store/analysisStore';
import { Card } from '../../../shared/ui/Card/Card';
import type { Analysis } from '../../../shared/types/api.types';

interface NodeDetailsProps {
  analysis: Analysis;
}

export function NodeDetails({ analysis }: NodeDetailsProps) {
  const { selectedNode, setSelectedNode } = useAnalysisStore();

  if (!selectedNode) return null;

  const module = analysis.projection.modules.find((m) => m.id === selectedNode);
  if (!module) return null;

  return (
    <div className="absolute top-4 left-4 w-80 z-20 max-h-[600px] overflow-y-auto">
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{module.path}</p>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-blue-600">{module.files.length}</div>
              <div className="text-xs text-gray-600">Files</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-orange-600">{module.dependencies.length}</div>
              <div className="text-xs text-gray-600">Deps</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-2xl font-bold text-green-600">{module.dependents.length}</div>
              <div className="text-xs text-gray-600">Used By</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Files ({module.files.length})</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {module.files.slice(0, 10).map((file) => (
                <div key={file} className="text-xs text-gray-600 truncate" title={file}>
                  📄 {file.split('/').pop()}
                </div>
              ))}
              {module.files.length > 10 && (
                <div className="text-xs text-gray-500 italic">
                  +{module.files.length - 10} more files
                </div>
              )}
            </div>
          </div>

          {module.dependencies.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Dependencies ({module.dependencies.length})</h4>
              <div className="space-y-1">
                {module.dependencies.slice(0, 5).map((depId) => {
                  const depModule = analysis.projection.modules.find((m) => m.id === depId);
                  return (
                    <div key={depId} className="text-xs text-gray-600">
                      → {depModule?.name || depId}
                    </div>
                  );
                })}
                {module.dependencies.length > 5 && (
                  <div className="text-xs text-gray-500 italic">
                    +{module.dependencies.length - 5} more
                  </div>
                )}
              </div>
            </div>
          )}

          {module.dependents.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Used By ({module.dependents.length})</h4>
              <div className="space-y-1">
                {module.dependents.slice(0, 5).map((depId) => {
                  const depModule = analysis.projection.modules.find((m) => m.id === depId);
                  return (
                    <div key={depId} className="text-xs text-gray-600">
                      ← {depModule?.name || depId}
                    </div>
                  );
                })}
                {module.dependents.length > 5 && (
                  <div className="text-xs text-gray-500 italic">
                    +{module.dependents.length - 5} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

