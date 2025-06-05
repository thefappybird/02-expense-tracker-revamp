import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination-buttons',
  imports: [],
  templateUrl: './pagination-buttons.component.html',
  styleUrl: './pagination-buttons.component.css',
})
export class PaginationButtonsComponent {
  currentPage = input.required<number>();
  comparePage = input.required<number>();
  itemsPerPage = computed(() => {
    return window.innerWidth >= 1024 ? 10 : 5;
  });
  previousPage = output();
  nextPage = output();

  onClickPrevious() {
    if (this.currentPage() > 1) {
      this.previousPage.emit();
    }
  }
  onClickNext() {
    if (this.currentPage() < this.comparePage()) {
      this.nextPage.emit();
    }
  }
}
