/**
 * Module List Component
 */

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../shared/ui/Card/Card';
import { Badge } from '../../../shared/ui/Badge/Badge';
import type { Module } from '../../../shared/types/api.types';

interface ModuleListProps {
  modules: Module[];
  onModuleSelect?: (module: Module) => void;
}

export function ModuleList({ modules, onModuleSelect }: ModuleListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'files' | 'dependencies'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedModules = [...modules].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'files') {
      comparison = a.files.length - b.files.length;
    } else if (sortBy === 'dependencies') {
      comparison = a.dependencies.length - b.dependencies.length;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: 'name' | 'files' | 'dependencies') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules ({modules.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  Module {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('files')}
                >
                  Files {sortBy === 'files' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('dependencies')}
                >
                  Dependencies {sortBy === 'dependencies' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dependents
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedModules.map((module) => (
                <tr
                  key={module.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onModuleSelect?.(module)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {module.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <Badge variant="info">{module.files.length}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <Badge variant={module.dependencies.length > 5 ? 'warning' : 'default'}>
                      {module.dependencies.length}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <Badge variant="default">{module.dependents.length}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}


