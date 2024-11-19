import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-d3-chart',
    imports: [],
    templateUrl: './d3-chart.component.html',
    styleUrl: './d3-chart.component.scss'
})
export class D3ChartComponent implements OnInit {

  private data = [30, 86, 168, 281, 303, 365];
  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.elRef.nativeElement)
      .select('.d3-chart-container')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: number[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((_, i) => i.toString()))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data)!])
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));

    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_: any, i: { toString: () => string; }) => x(i.toString())!)
      .attr('y', (d: d3.NumberValue) => y(d))
      .attr('width', x.bandwidth())
      .attr('height', (d: d3.NumberValue) => this.height - y(d))
      .attr('fill', '#d04a35');
  }


}
