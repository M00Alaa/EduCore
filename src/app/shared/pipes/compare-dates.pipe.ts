import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compareDates',
  standalone: true
})
export class CompareDatesPipe implements PipeTransform {
  transform(d1: Date | string | undefined | null , d2?: Date | string ): 1 | 2 {
    const date1 = d1 ? new Date(d1) : new Date();
    const date2 = d2 ? new Date(d2) : new Date();

    return date1.getTime() > date2.getTime() ? 1 : 2;
  }

}
