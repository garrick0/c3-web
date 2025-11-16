/**
 * Analysis Form Component
 */

import { useState, FormEvent } from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import { Card } from '../../../shared/ui/Card/Card';
import type { AggregationLevel, AnalysisConfig } from '../../../shared/types/api.types';

interface AnalysisFormProps {
  onAnalyze: (config: AnalysisConfig) => void;
  isLoading?: boolean;
}

export function AnalysisForm({ onAnalyze, isLoading = false }: AnalysisFormProps) {
  const [rootPath, setRootPath] = useState('/Users/samuelgleeson/dev/c3-projection/src');
  const [aggregationLevel, setAggregationLevel] = useState<AggregationLevel>('top-level');
  const [includeTests, setIncludeTests] = useState(false);
  const [includePrivate, setIncludePrivate] = useState(false);
  const [excludePatterns, setExcludePatterns] = useState('node_modules, dist, **/*.test.ts');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAnalyze({
      rootPath,
      config: {
        aggregationLevel,
        includeTests,
        includePrivate,
        excludePatterns: excludePatterns.split(',').map((s) => s.trim()).filter(Boolean),
      },
    });
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Analyze Codebase</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rootPath" className="label">
            Codebase Path *
          </label>
          <input
            id="rootPath"
            type="text"
            value={rootPath}
            onChange={(e) => setRootPath(e.target.value)}
            placeholder="/Users/user/dev/my-project/src"
            className="input"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Full path to the codebase directory to analyze
          </p>
        </div>

        <div>
          <label className="label">Aggregation Level</label>
          <div className="flex gap-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="directory"
                checked={aggregationLevel === 'directory'}
                onChange={(e) => setAggregationLevel(e.target.value as AggregationLevel)}
                className="form-radio text-primary-600"
              />
              <span className="ml-2">Directory</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="top-level"
                checked={aggregationLevel === 'top-level'}
                onChange={(e) => setAggregationLevel(e.target.value as AggregationLevel)}
                className="form-radio text-primary-600"
              />
              <span className="ml-2">Top-Level</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="package"
                checked={aggregationLevel === 'package'}
                onChange={(e) => setAggregationLevel(e.target.value as AggregationLevel)}
                className="form-radio text-primary-600"
              />
              <span className="ml-2">Package</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={includeTests}
              onChange={(e) => setIncludeTests(e.target.checked)}
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">Include test files</span>
          </label>
          <br />
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={includePrivate}
              onChange={(e) => setIncludePrivate(e.target.checked)}
              className="form-checkbox text-primary-600"
            />
            <span className="ml-2">Include private members</span>
          </label>
        </div>

        <div>
          <label htmlFor="excludePatterns" className="label">
            Exclude Patterns (comma-separated)
          </label>
          <input
            id="excludePatterns"
            type="text"
            value={excludePatterns}
            onChange={(e) => setExcludePatterns(e.target.value)}
            placeholder="node_modules, dist, **/*.test.ts"
            className="input"
          />
          <p className="mt-1 text-sm text-gray-500">
            Glob patterns for files/directories to exclude
          </p>
        </div>

        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Codebase'}
        </Button>
      </form>
    </Card>
  );
}


