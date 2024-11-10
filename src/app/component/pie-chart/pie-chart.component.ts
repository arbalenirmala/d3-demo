import { Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnChanges{
  chartData = [
    { label: 'Apples', value: 30 },
    { label: 'Oranges', value: 20 },
    { label: 'Bananas', value: 25 },
    { label: 'Pear', value: 10 },
    { label: 'Kiwi', value: 5 },
    { label: 'Berries', value: 10 },

  ];

  private svg: any;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2;
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
      .select('.pie-chart-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => d.value);
    const data_ready = pie(this.chartData);

    // Build the arcs
    const arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius);

    // Append the arcs
    this.svg.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', (d: any) => this.color(d.data.label))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px")

      // Add labels
    this.svg.selectAll('text')
    .data(data_ready)
    .enter()
    .append('text')
    .text((d: any) => d.data.label)
    .attr("transform", (d: any) => `translate(${arcGenerator.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", "12px");
}

private updateChart(): void {
  this.svg.selectAll('*').remove(); // Clear the chart
  this.drawChart(); // Redraw the chart with updated data
}

}
