import {
  Component,
  effect,
  EffectRef,
  inject,
  input,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
  type OnChanges,
  type SimpleChanges,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Chart,
  type ChartConfiguration,
  type ChartData,
  type ChartType,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  getCategoryCounts,
  getThemeColor,
  updateBarChartData,
  updateBarChartOptions,
} from '../../../../../util/helpers';
import { ThemePickerService } from '../../../shared/header/theme-picker/theme-picker.service';
import { DashboardService } from '../../dashboard.service';
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip
);

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class OverviewComponent implements OnDestroy {
  themeService = inject(ThemePickerService);
  expenses = inject(DashboardService).exposedExpenses;
  private destroyRef: EffectRef | undefined;
  public barChartOptions: ChartConfiguration['options'] =
    updateBarChartOptions();
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = updateBarChartData(
    getCategoryCounts(this.expenses()?.allExpenses || [])
  );

  constructor() {
    // React to theme changes
    this.destroyRef = effect(() => {
      this.themeService.exposedTheme();
      this.barChartOptions = updateBarChartOptions();
      this.barChartData = updateBarChartData(
        getCategoryCounts(this.expenses()?.allExpenses || [])
      );
    });
  }

  ngOnDestroy(): void {
    this.destroyRef?.destroy();
  }
}
