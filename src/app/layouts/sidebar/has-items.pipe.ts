import { Pipe, PipeTransform } from '@angular/core';
import { MenuItem } from './menu.model';

@Pipe({
  name: 'hasItems'
})
export class HasItemsPipe implements PipeTransform {

  transform(item: MenuItem): boolean {    
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

}
