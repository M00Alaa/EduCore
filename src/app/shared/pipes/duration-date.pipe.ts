import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationDate',
  standalone: true
})
export class DurationDatePipe implements PipeTransform {

  transform(start: string | null | undefined, end: string | null | undefined): number | null  {
    if (start && end) {
      // Calculate the difference in milliseconds
      const timeDifference = new Date(end).getTime() - new Date(start).getTime();
      
      // Convert milliseconds to days
      const daysDifference =  Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      return daysDifference;
  } else {
      return null;
  }
  }

}
