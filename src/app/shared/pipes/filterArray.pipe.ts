import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterArray',
  standalone: true,
})
export class FilterArrayPipe implements PipeTransform {

  transform(originalArr: any[] | undefined | null, filterFn: (a: any) => boolean): any[] {
    if (!originalArr) {
      return [];
    }
   
    return originalArr.filter(filterFn);
  }
}
