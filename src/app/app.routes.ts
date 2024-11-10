import { Routes } from '@angular/router';
import {D3TreeComponent} from './component/d3-tree/d3-tree.component';
import {D3ChartComponent} from './component/d3-chart/d3-chart.component';
import {PieChartComponent} from './component/pie-chart/pie-chart.component';
import {MultiLineChartComponent} from './component/multi-line-chart/multi-line-chart.component';

export const routes: Routes = [
    { path: '', redirectTo: '/chart', pathMatch: 'full' },
    { path: 'tree', component: D3TreeComponent },
    { path: 'chart', component: D3ChartComponent },
    { path: 'piechart', component: PieChartComponent },
    { path: 'multiline', component: MultiLineChartComponent },
    { path: '**', redirectTo: '/chart' }
];
