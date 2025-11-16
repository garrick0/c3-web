/**
 * Validation Dashboard Component
 */

import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/ui/Card/Card';
import { Badge } from '../../../shared/ui/Badge/Badge';
import type { Validation } from '../../../shared/types/api.types';

interface ValidationDashboardProps {
  validation: Validation;
}

export function ValidationDashboard({ validation }: ValidationDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeEmoji = (grade: string) => {
    if (grade === 'A+') return '🏆';
    if (grade === 'A') return '✨';
    if (grade === 'B') return '👍';
    if (grade === 'C') return '⚠️';
    return '❌';
  };

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <Card>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">{getGradeEmoji(validation.grade)}</div>
          <div className={`text-5xl font-bold ${getScoreColor(validation.score)}`}>
            {validation.score}
          </div>
          <div className="text-gray-500 text-sm mt-1">out of 100</div>
          <div className="mt-4">
            <Badge variant={validation.score >= 90 ? 'success' : validation.score >= 60 ? 'warning' : 'error'}>
              Grade: {validation.grade}
            </Badge>
          </div>
          {validation.score >= 90 && (
            <p className="mt-4 text-gray-600">
              Excellent! Your architecture follows Clean Architecture principles perfectly!
            </p>
          )}
        </div>
      </Card>

      {/* Validation Checks */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Checks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(validation.checks).map(([key, check]) => (
              <div key={key} className="flex items-start justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-start gap-3">
                  <div className="text-xl">{check.passed ? '✅' : '❌'}</div>
                  <div>
                    <div className="font-medium text-gray-900">{check.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{check.message}</div>
                    {check.details && (
                      <div className="text-xs text-gray-500 mt-1">{check.details}</div>
                    )}
                  </div>
                </div>
                <Badge variant={check.passed ? 'success' : 'error'}>
                  {check.passed ? 'PASS' : 'FAIL'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Layer Summary */}
      {validation.layers && validation.layers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Layer Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {validation.layers.map((layer) => (
                <div key={layer.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: layer.color }}
                    />
                    <div>
                      <div className="font-medium text-gray-900">{layer.name}</div>
                      <div className="text-xs text-gray-600">{layer.description}</div>
                    </div>
                  </div>
                  <Badge variant="info">{layer.moduleCount} modules</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {validation.recommendations && validation.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>💡 Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {validation.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span>→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

