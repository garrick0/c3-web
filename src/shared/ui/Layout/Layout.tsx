/**
 * Layout Component
 */

import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinkClass = (path: string) =>
    clsx(
      'px-3 py-2 rounded-md text-sm font-medium transition-colors',
      isActive(path)
        ? 'bg-gray-900 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors">
                C3
              </Link>
              <nav className="hidden md:flex gap-1">
                <Link to="/analysis" className={navLinkClass('/analysis')}>
                  📊 Analysis
                </Link>
                <Link to="/projection" className={navLinkClass('/projection')}>
                  🎯 Graph
                </Link>
                <Link to="/architecture" className={navLinkClass('/architecture')}>
                  🏛️ Architecture
                </Link>
                <Link to="/compliance" className={navLinkClass('/compliance')}>
                  ✅ Compliance
                </Link>
                <Link to="/discovery" className={navLinkClass('/discovery')}>
                  🔍 Discovery
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/analysis/history"
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
              >
                📜 History
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>C3 - Code Standards Management System v0.2.0</p>
        </div>
      </footer>
    </div>
  );
}
