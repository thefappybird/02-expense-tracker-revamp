import {
  Component,
  computed,
  effect,
  inject,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAllRecentPurchases } from '../../../../../util/helpers';
import { PluralizePipe } from '../../../../../util/pipes/pluralize.pipe';
import { DashboardService } from '../../dashboard.service';
interface Purchase {
  id: string | undefined;
  name: string;
  price: number;
  currency: string;
  date: string;
}
@Component({
  selector: 'app-recent',
  imports: [CommonModule, PluralizePipe],
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RecentComponent {
  dashboardService = inject(DashboardService);
  expenses = this.dashboardService.exposedExpenses;
  currentPage = signal(1);

  itemsPerPage = computed(() => {
    return window.innerWidth >= 1024 ? 10 : 5;
  });
  recentPurchases = signal<Purchase[] | null>(null);

  paginatedPurchases = signal<Purchase[] | null>(null);

  constructor() {
    effect(() => {
      const allPurchases = getAllRecentPurchases(
        this.expenses()?.allExpenses || []
      );
      this.recentPurchases.set(allPurchases);
      this.updatePagination();
    });
  }

  updatePagination() {
    let allPurchases = this.recentPurchases() || [];
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    allPurchases = [...allPurchases.slice(startIndex, endIndex)];
    this.paginatedPurchases.set(allPurchases);
  }

  nextPage() {
    if (
      this.currentPage() <
      Math.ceil((this.recentPurchases()?.length || 0) / this.itemsPerPage())
    ) {
      this.currentPage.set(this.currentPage() + 1);
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.updatePagination();
    }
  }
}
