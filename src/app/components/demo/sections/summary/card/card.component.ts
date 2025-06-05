import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { getSummaryDesc } from '../../../../../../util/helpers';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  title = input.required<string>();
  item = input.required<string>();
  succ = input.required<string>();
  fallback = input.required<string>();
  description = computed(() =>
    getSummaryDesc(this.item() !== 'N/A', this.succ(), this.fallback())
  );
}
