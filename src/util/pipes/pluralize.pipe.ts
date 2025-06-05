// pluralize.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize',
  standalone: true,
})
export class PluralizePipe implements PipeTransform {
  transform(
    count: number | undefined | null,
    singular: string,
    plural?: string,
    zeroText?: string
  ): string {
    if (count === undefined || count === null) count = 0;

    if (count === 0 && zeroText) return zeroText;

    if (!plural) plural = singular + 's';

    return `${count} ${count === 1 ? singular : plural}`;
  }
}
