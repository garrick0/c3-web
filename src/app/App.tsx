import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { CompliancePage } from '../pages/compliance/CompliancePage';
import { DiscoveryPage } from '../pages/discovery/DiscoveryPage';
import { ProjectionPage } from '../pages/projection/ProjectionPage';
import { ModuleAnalysisPage } from '../pages/module-analysis/ModuleAnalysisPage';
import { AnalysisHistoryPage } from '../pages/module-analysis/AnalysisHistoryPage';
import { ArchitectureValidationPage } from '../pages/architecture/ArchitectureValidationPage';
import { Layout } from '../shared/ui/Layout/Layout';
import { ErrorBoundary } from '../shared/ui/ErrorBoundary/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/analysis" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/projection" element={<ProjectionPage />} />
            <Route path="/analysis" element={<ModuleAnalysisPage />} />
            <Route path="/analysis/history" element={<AnalysisHistoryPage />} />
            <Route path="/architecture" element={<ArchitectureValidationPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
