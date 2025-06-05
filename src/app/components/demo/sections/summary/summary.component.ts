import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CardComponent } from './card/card.component';
import { OppExpenses } from '../../../../../util/models';
import { findOppositeExpenses } from '../../../../../util/helpers';
import { PluralizePipe } from '../../../../../util/pipes/pluralize.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [CardComponent, PluralizePipe, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  dashboardService = inject(DashboardService);
  expenses = this.dashboardService.exposedExpenses;
  oppositeExpenses = computed<OppExpenses | null>(() =>
    findOppositeExpenses(this.expenses()?.allExpenses)
  );
  get unPopular() {
    return this.oppositeExpenses()?.leastPopular;
  }
  get popular() {
    return this.oppositeExpenses()?.mostPopular;
  }
  get totalExpenses() {
    return this.expenses()?.allExpenses.length || 0;
  }
  get expensesTotalPrice() {
    return this.expenses()?.total || 0;
  }
}
