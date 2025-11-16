/**
 * Validation API
 */

import { apiClient } from '../../../shared/api/client';
import type { ValidationConfig } from '../../../shared/types/api.types';

export const validationApi = {
  validate: (config: ValidationConfig) => apiClient.validateArchitecture(config),
};


