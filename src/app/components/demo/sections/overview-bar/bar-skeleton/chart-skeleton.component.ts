import { Component, input } from '@angular/core';
import { fadeInOut } from '../../../../../../util/animations';

@Component({
  selector: 'app-chart-skeleton',
  imports: [],
  templateUrl: './chart-skeleton.component.html',
  styleUrl: './chart-skeleton.component.css',
  animations: [fadeInOut],
})
export class ChartSkeletonComponent {
  chartType = input<'Bar' | 'Pie'>('Bar');
}
