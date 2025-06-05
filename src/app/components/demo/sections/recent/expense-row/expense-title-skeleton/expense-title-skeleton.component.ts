import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-title-skeleton',
  imports: [],
  templateUrl: './expense-title-skeleton.component.html',
  styleUrl: './expense-title-skeleton.component.css',
})
export class ExpenseTitleSkeletonComponent {
  randomWidth = `${Math.floor(Math.random() * (140 - 80 + 1)) + 80}px`;
}
