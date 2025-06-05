import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  effect,
  EffectRef,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ThemePickerService } from '../../../shared/header/theme-picker/theme-picker.service';
import {
  calculateCategoryTotals,
  updatePieChartData,
  getThemeColor,
  updateChartOptions,
} from '../../../../../util/helpers';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-spent-pie',
  imports: [BaseChartDirective],
  templateUrl: './spent-pie.component.html',
  styleUrl: './spent-pie.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SpentPieComponent implements OnDestroy {
  expenses = inject(DashboardService).exposedExpenses;
  themePickerService = inject(ThemePickerService);
  private destroyRef: EffectRef | undefined;

  public pieChartOptions: ChartConfiguration['options'] = updateChartOptions();
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  constructor() {
    this.destroyRef = effect(() => {
      this.pieChartData = updatePieChartData(
        this.themePickerService.exposedTheme(),
        calculateCategoryTotals(this.expenses()?.allExpenses || [])
      );
      this.pieChartOptions = updateChartOptions();
    });
  }

  ngOnDestroy(): void {
    this.destroyRef?.destroy();
  }
}
