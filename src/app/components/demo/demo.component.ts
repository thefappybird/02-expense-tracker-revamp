import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { SummaryComponent } from './sections/summary/summary.component';
import { OverviewBarComponent } from './sections/overview-bar/overview-bar.component';
import { RecentComponent } from './sections/recent/recent.component';
import { SpentPieComponent } from './sections/spent-pie/spent-pie.component';

@Component({
  selector: 'app-demo',
  imports: [
    SummaryComponent,
    OverviewBarComponent,
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
