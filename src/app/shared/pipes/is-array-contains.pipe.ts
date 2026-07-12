import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isArrayContains'
})
export class IsArrayContainsPipe implements PipeTransform {

   transform(val: any | undefined | null, filterFn: (a: any) => boolean): boolean {
    if (!val) {
      return false;
    }
   
    return filterFn(val);
  }
}
