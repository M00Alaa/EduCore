import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {

  transform(value: any[] | undefined, callback: (item: any) => any): any[] {
    return value?.map(callback) || [];
  }

}
