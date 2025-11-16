/**
 * Graph Layout Utilities
 */

import * as d3 from 'd3';
import type { GraphData, GraphNode, GraphEdge } from '../../../shared/types/api.types';
import type { Analysis } from '../../../shared/types/api.types';

export function transformAnalysisToGraphData(analysis: Analysis): GraphData {
  const nodes: GraphNode[] = analysis.projection.modules.map((module) => ({
    id: module.id,
    label: module.name,
    type: 'module',
    size: Math.max(20, Math.min(50, module.files.length * 5)),
    color: getNodeColorByDependencies(module.dependencies.length),
    metadata: {
      files: module.files,
      fileCount: module.files.length,
      dependencyCount: module.dependencies.length,
      dependentCount: module.dependents.length,
    },
  }));

  const edges: GraphEdge[] = [];
  analysis.projection.modules.forEach((module) => {
    module.dependencies.forEach((depId, index) => {
      edges.push({
        id: `${module.id}-${depId}-${index}`,
        source: module.id,
        target: depId,
        type: 'dependency',
        weight: 1,
      });
    });
  });

  return { nodes, edges };
}

function getNodeColorByDependencies(count: number): string {
  if (count === 0) return '#10b981'; // green
  if (count <= 2) return '#3b82f6'; // blue
  if (count <= 5) return '#f59e0b'; // orange
  return '#ef4444'; // red
}

export function applyForceLayout(
  graphData: GraphData,
  width: number,
  height: number
): d3.Simulation<GraphNode, GraphEdge> {
  const simulation = d3
    .forceSimulation(graphData.nodes as any)
    .force(
      'link',
      d3.forceLink(graphData.edges as any).id((d: any) => d.id).distance(100)
    )
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius((d: any) => d.size + 10));

  return simulation as any;
}

export function applyHierarchicalLayout(
  graphData: GraphData,
  width: number,
  height: number
): void {
  // Simple hierarchical layout - layer nodes by dependency depth
  const visited = new Set<string>();
  const layers: Map<string, number> = new Map();

  function getDepth(nodeId: string, depth: number = 0): number {
    if (visited.has(nodeId)) return layers.get(nodeId) || 0;
    visited.add(nodeId);
    
    const node = graphData.nodes.find((n) => n.id === nodeId);
    if (!node) return depth;

    const dependencies = graphData.edges.filter((e) => e.source === nodeId);
    
    if (dependencies.length === 0) {
      layers.set(nodeId, 0);
      return 0;
    }

    const maxDepth = Math.max(
      ...dependencies.map((dep) => getDepth(dep.target, depth + 1))
    );
    
    layers.set(nodeId, maxDepth + 1);
    return maxDepth + 1;
  }

  // Calculate depths
  graphData.nodes.forEach((node) => getDepth(node.id));

  // Position nodes
  const maxDepth = Math.max(...Array.from(layers.values()), 0);
  const layerHeight = height / (maxDepth + 2);
  const layerCounts = new Map<number, number>();

  graphData.nodes.forEach((node) => {
    const depth = layers.get(node.id) || 0;
    const count = layerCounts.get(depth) || 0;
    layerCounts.set(depth, count + 1);
    
    const nodesInLayer = graphData.nodes.filter((n) => layers.get(n.id) === depth).length;
    const layerWidth = width / (nodesInLayer + 1);
    
    node.x = layerWidth * (count + 1);
    node.y = layerHeight * (maxDepth - depth + 1);
    
    layerCounts.set(depth, count + 1);
  });
}

