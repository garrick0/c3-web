/**
 * Architecture Validation Page
 */

import { useState } from 'react';
import { Button } from '../../shared/ui/Button/Button';
import { Card } from '../../shared/ui/Card/Card';
import { ValidationDashboard } from '../../features/architecture-validation/ui/ValidationDashboard';
import { useValidateArchitecture } from '../../features/architecture-validation/hooks/useValidation';

export function ArchitectureValidationPage() {
  const [rootPath, setRootPath] = useState('/Users/samuelgleeson/dev/c3-projection/src');
  const { mutate: validate, data, isPending } = useValidateArchitecture();

  const handleValidate = () => {
    validate({ rootPath });
  };

  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Architecture Validation</h1>
        <p className="text-gray-600 mt-2">
          Validate Clean Architecture principles and architectural patterns
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Validate Codebase</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
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
            </div>
            <Button onClick={handleValidate} isLoading={isPending}>
              Validate Architecture
            </Button>
          </div>
        </Card>

        {data?.data && <ValidationDashboard validation={data.data} />}
      </div>
    </div>
  );
}


