import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { Purchase } from '../../../../../../util/models';
import { ExpenseTitleComponent } from './expense-title/expense-title.component';

@Component({
  selector: 'app-expense-row',
  imports: [CommonModule, ExpenseTitleComponent],
  templateUrl: './expense-row.component.html',
  styleUrl: './expense-row.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ExpenseRowComponent {
  paginatedPurchases = input.required<Purchase[] | null>();
}
