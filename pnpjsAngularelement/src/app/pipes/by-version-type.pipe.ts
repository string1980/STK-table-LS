import { Pipe, PipeTransform } from '@angular/core';
import {IRow} from '../interfaces/table';

@Pipe({
  name: 'byVersionType'
})
export class ByVersionTypePipe implements PipeTransform {

  transform(rows: IRow[], searchTerm: any): any {
    if (!rows || !searchTerm) {
      return rows;
    }
    return rows.filter((row) => {
      return row.VersionType.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }

}
