/**
 * Export Hook
 */

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { analysisApi } from '../api/analysis.api';
import { downloadFile } from '../../../shared/utils/download';
import type { ExportFormat } from '../../../shared/types/api.types';

export function useExportAnalysis() {
  return useMutation({
    mutationFn: ({ id, format }: { id: string; format: ExportFormat }) =>
      analysisApi.export(id, format),
    onMutate: () => {
      toast.loading('Preparing export...', { id: 'export' });
    },
    onSuccess: (response) => {
      const exportData = response.data;
      const mimeTypes = {
        json: 'application/json',
        graphml: 'application/xml',
        svg: 'image/svg+xml',
        markdown: 'text/markdown',
      };
      downloadFile(exportData.content, exportData.filename, mimeTypes[exportData.format]);
      toast.success('Export downloaded!', { id: 'export' });
    },
    onError: (error: Error) => {
      toast.error(`Export failed: ${error.message}`, { id: 'export' });
    },
  });
}


