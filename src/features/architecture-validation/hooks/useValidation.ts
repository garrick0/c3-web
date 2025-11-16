/**
 * Validation Hook
 */

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validationApi } from '../api/validation.api';
import type { ValidationConfig } from '../../../shared/types/api.types';

export function useValidateArchitecture() {
  return useMutation({
    mutationFn: (config: ValidationConfig) => validationApi.validate(config),
    onMutate: () => {
      toast.loading('Validating architecture...', { id: 'validate' });
    },
    onSuccess: () => {
      toast.success('Validation complete!', { id: 'validate' });
    },
    onError: (error: Error) => {
      toast.error(`Validation failed: ${error.message}`, { id: 'validate' });
    },
  });
}


