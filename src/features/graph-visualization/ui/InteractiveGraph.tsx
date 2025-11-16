/**
 * Interactive Graph Component
 */

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { transformAnalysisToGraphData, applyForceLayout, applyHierarchicalLayout } from '../utils/graphLayout';
import { useAnalysisStore } from '../../../shared/store/analysisStore';
import { LoadingSpinner } from '../../../shared/ui/Spinner/Spinner';
import type { Analysis } from '../../../shared/types/api.types';

interface InteractiveGraphProps {
  analysis: Analysis;
}

export function InteractiveGraph({ analysis }: InteractiveGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedNode, setSelectedNode, layout, colorScheme, filters } = useAnalysisStore();
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    setIsRendering(true);

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Transform data
    const graphData = transformAnalysisToGraphData(analysis);

    // Setup SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Add zoom behavior
    const g = svg.append('g');
    
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    svg.call(zoom as any);

    // Create arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#9ca3af');

    // Add edges
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graphData.edges)
      .join('line')
      .attr('class', 'graph-edge')
      .attr('marker-end', 'url(#arrowhead)');

    // Add nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(graphData.nodes)
      .join('g')
      .attr('class', 'graph-node')
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d.id);
      });

    node.append('circle')
      .attr('r', (d) => d.size)
      .attr('fill', (d) => d.color)
      .attr('stroke', (d) => d.id === selectedNode ? '#3b82f6' : '#fff')
      .attr('stroke-width', (d) => d.id === selectedNode ? 3 : 2);

    // Add labels (if enabled)
    if (filters.showLabels) {
      node.append('text')
        .text((d) => d.label)
        .attr('class', 'graph-label node-label')
        .attr('dy', (d) => d.size + 15)
        .style('font-size', '11px');
    }

    // Apply layout
    if (layout === 'force') {
      const simulation = applyForceLayout(graphData, width, height);
      
      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      });

      simulation.on('end', () => setIsRendering(false));

      // Add drag behavior
      const drag = d3.drag()
        .on('start', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d: any) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d: any) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });

      node.call(drag as any);

      return () => {
        simulation.stop();
      };
    } else {
      // Hierarchical layout
      applyHierarchicalLayout(graphData, width, height);
      
      link
        .attr('x1', (d: any) => graphData.nodes.find(n => n.id === d.source)?.x || 0)
        .attr('y1', (d: any) => graphData.nodes.find(n => n.id === d.source)?.y || 0)
        .attr('x2', (d: any) => graphData.nodes.find(n => n.id === d.target)?.x || 0)
        .attr('y2', (d: any) => graphData.nodes.find(n => n.id === d.target)?.y || 0);

      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      
      setIsRendering(false);
    }

    // Click on background to deselect
    svg.on('click', () => setSelectedNode(null));

  }, [analysis, layout, colorScheme, filters, selectedNode, setSelectedNode]);

  return (
    <div ref={containerRef} className="graph-container relative">
      {isRendering && (
        <div className="absolute top-4 right-4 z-10">
          <LoadingSpinner message="Rendering..." />
        </div>
      )}
      <svg ref={svgRef} className="graph-svg" />
    </div>
  );
}

