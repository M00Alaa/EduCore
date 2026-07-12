import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysDiff',
  standalone: true
})
export class DaysDiffPipe implements PipeTransform {

  transform(date1: string | undefined | null, date2: string | undefined | null): number {
    if (!date1 || !date2) return 0;
    const convertedDate1 = new Date(date1);
    const convertedDate2 = new Date(date2);
    convertedDate1.setHours(0,0,0,0);
    convertedDate2.setHours(23,59,59,59);    
    return Math.ceil(Math.abs((convertedDate1.getTime() - convertedDate2.getTime()) / (1000 * 60 * 60 * 24)));
  }

}
