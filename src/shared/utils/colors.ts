/**
 * Color Utilities
 */

import { ColorScheme } from '../types/api.types';

export const COLOR_SCHEMES = {
  default: {
    low: '#10b981',      // green
    medium: '#3b82f6',   // blue
    high: '#8b5cf6',     // purple
  },
  dependencies: {
    low: '#10b981',      // green (0-2 deps)
    medium: '#f59e0b',   // yellow (3-5 deps)
    high: '#ef4444',     // red (6+ deps)
  },
  complexity: {
    low: '#60a5fa',      // light blue
    medium: '#f59e0b',   // orange
    high: '#dc2626',     // dark red
  },
  layer: {
    domain: '#8b5cf6',        // purple
    application: '#3b82f6',   // blue
    infrastructure: '#10b981', // green
    presentation: '#f59e0b',  // orange
  },
};

export function getNodeColor(
  value: number,
  scheme: ColorScheme = 'default'
): string {
  if (scheme === 'layer') {
    return COLOR_SCHEMES.layer.infrastructure; // Default to infrastructure
  }

  const colors = COLOR_SCHEMES[scheme];
  
  if (value <= 2) return colors.low;
  if (value <= 5) return colors.medium;
  return colors.high;
}

export function getLayerColor(layerName: string): string {
  const name = layerName.toLowerCase();
  if (name.includes('domain')) return COLOR_SCHEMES.layer.domain;
  if (name.includes('application')) return COLOR_SCHEMES.layer.application;
  if (name.includes('infrastructure')) return COLOR_SCHEMES.layer.infrastructure;
  if (name.includes('presentation') || name.includes('ui')) return COLOR_SCHEMES.layer.presentation;
  return COLOR_SCHEMES.default.medium;
}

export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


