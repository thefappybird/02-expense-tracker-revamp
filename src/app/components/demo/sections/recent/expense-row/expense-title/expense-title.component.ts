import { Component, input } from '@angular/core';
import { ExpenseTitleSkeletonComponent } from '../expense-title-skeleton/expense-title-skeleton.component';

@Component({
  selector: 'app-expense-title',
  imports: [ExpenseTitleSkeletonComponent],
  templateUrl: './expense-title.component.html',
  styleUrl: './expense-title.component.css',
})
export class ExpenseTitleComponent {
  purchase = input.required<{ name: string; date: string }>();
}
