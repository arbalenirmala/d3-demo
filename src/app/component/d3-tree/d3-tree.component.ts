import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-tree',
  standalone: true,
  imports: [],
  templateUrl: './d3-tree.component.html',
  styleUrl: './d3-tree.component.scss'
})
export class D3TreeComponent implements OnInit  {
  private data = {
    name: 'Root',
    children: [
      {
        name: 'Child 1',
        children: [
          { name: 'Child 1.1' },
          { name: 'Child 1.2' }
        ]
      },
      {
        name: 'Child 2',
        children: [
          { name: 'Child 2.1' },
          {
            name: 'Child 2.2',
            children: [
              { name: 'Child 2.2.1' },
              { name: 'Child 2.2.2' }
            ]
          }
        ]
      }
    ]
  };

  private svg: any;
  private margin = { top: 10, right: 120, bottom: 10, left: 40 };
  private width = 960 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.drawTree(this.data);
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement)
      .select('.d3-tree-container')
      .append('svg')
      .attr('width', this.width + this.margin.right + this.margin.left)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private drawTree(data: any): void {
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([this.height, this.width]);
    treeLayout(root);

    // Add links between nodes
    const linkGenerator = (d: d3.HierarchyPointLink<any>) => {
      return `M${d.source.y},${d.source.x}C${(d.source.y + d.target.y) / 2},${d.source.x} 
              ${(d.source.y + d.target.y) / 2},${d.target.x} ${d.target.y},${d.target.x}`;
    };

    // Add links between nodes using custom link generator
    this.svg.selectAll('path.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', linkGenerator);

    // Add nodes
    const node = this.svg.selectAll('g.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: d3.HierarchyPointNode<any>) => 'translate(' + d.y + ',' + d.x + ')');

    node.append('circle')
      .attr('r', 5)
      .attr('fill', '#555');

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', (d: d3.HierarchyPointNode<any>) => d.children ? -10 : 10)
      .style('text-anchor', (d: d3.HierarchyPointNode<any>) => d.children ? 'end' : 'start')
      .text((d: d3.HierarchyPointNode<any>) => d.data.name);
  }
}
