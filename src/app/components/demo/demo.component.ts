import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { SummaryComponent } from './sections/summary/summary.component';
import { OverviewComponent } from './sections/overview/overview.component';
import { RecentComponent } from './sections/recent/recent.component';
import { SpentPieComponent } from './sections/spent-pie/spent-pie.component';

@Component({
  selector: 'app-demo',
  imports: [
    SummaryComponent,
    OverviewComponent,
    RecentComponent,
    SpentPieComponent,
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css',
})
export class DemoComponent implements OnInit {
  dashboardService = inject(DashboardService);
  ngOnInit(): void {
    this.dashboardService.getExpenses();
  }
}
