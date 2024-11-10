import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-multi-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './multi-line-chart.component.html',
  styleUrl: './multi-line-chart.component.scss'
})
export class MultiLineChartComponent implements OnInit, OnChanges {
  multiLineChartData = [
    { name: 'Series 1', values: [ { date: new Date(2020, 1, 1), value: 30 }, { date: new Date(2020, 2, 1), value: 40 }, { date: new Date(2020, 3, 1), value: 35 } ] },
    { name: 'Series 2', values: [ { date: new Date(2020, 1, 1), value: 20 }, { date: new Date(2020, 2, 1), value: 50 }, { date: new Date(2020, 3, 1), value: 45 } ] },
    { name: 'Series 3', values: [ { date: new Date(2020, 1, 1), value: 10 }, { date: new Date(2020, 2, 1), value: 20 }, { date: new Date(2020, 3, 1), value: 25 } ] },
    { name: 'Series 4', values: [ { date: new Date(2020, 1, 1), value: 15 }, { date: new Date(2020, 2, 1), value: 10 }, { date: new Date(2020, 3, 1), value: 15 } ] },
    { name: 'Series 5', values: [ { date: new Date(2020, 1, 1), value: 25 }, { date: new Date(2020, 2, 1), value: 35 }, { date: new Date(2020, 3, 1), value: 30 } ] }

  ];  private svg: any;
  private margin = { top: 20, right: 80, bottom: 30, left: 50 };
  private width = 800 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;
  private color = d3.scaleOrdinal(d3.schemeCategory10);

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.svg) {
      this.updateChart();
    }
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement)
      .select('.line-chart-container')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private drawChart(): void {
    // Create scales
    const x = d3.scaleTime()
      .domain([
        d3.min(this.multiLineChartData, series => d3.min(series.values, d => d.date))!,
        d3.max(this.multiLineChartData, series => d3.max(series.values, d => d.date))!
      ])
      .range([0, this.width]);

    const y = d3.scaleLinear()
      .domain([
        d3.min(this.multiLineChartData, series => d3.min(series.values, d => d.value))!,
        d3.max(this.multiLineChartData, series => d3.max(series.values, d => d.value))!
      ])
      .range([this.height, 0]);

    // Create axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // Add X axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // Add Y axis
    this.svg.append('g')
      .call(yAxis);

    // Add line path for each data series
    const line = d3.line<{ date: Date, value: number }>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    this.multiLineChartData.forEach((series, i) => {
      this.svg.append('path')
        .datum(series.values)
        .attr('fill', 'none')
        .attr('stroke', this.color(series.name))
        .attr('stroke-width', 1.5)
        .attr('d', line)
        .attr('class', 'line');
    });

    // Add legend
    this.svg.selectAll('.legend')
      .data(this.multiLineChartData)
      .enter().append('text')
      .attr('class', 'legend')
      .attr('x', this.width - 100)
      .attr('y', (_d: any, i: number) => i * 20)
      .attr('dy', '0.35em')
      .style('fill', (d: { name: string; }) => this.color(d.name))
      .text((d: { name: any; }) => d.name);
  }

  private updateChart(): void {
    this.svg.selectAll('*').remove(); // Clear the chart
    this.drawChart(); // Redraw the chart with updated data
  }
}
