import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet ,Router } from '@angular/router';
import{ D3ChartComponent } from './component/d3-chart/d3-chart.component';
import {D3TreeComponent} from './component/d3-tree/d3-tree.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'd3-demo';

  constructor(private route:Router){}

  navigateTree(){
    this.route.navigate(['/tree']);
  }

  navigateChart(){
    this.route.navigate(['/chart']);
  }

  navigatePieChart(){
    this.route.navigate(['/piechart']);

  }

  navigateMultiLine(){
    this.route.navigate(['/multiline']);

  }
}
