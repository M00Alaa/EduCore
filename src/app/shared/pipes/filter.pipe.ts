import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] | undefined | null, propName: string, ...filterValues: (string | number | undefined)[]): any[] {
    if (!value) {
      return [];
    }
    if (!filterValues || filterValues?.length === 0) {
      return value;
    }
    return value.filter((item) => {
      return filterValues.includes(item[propName]);
    });
  }
}
