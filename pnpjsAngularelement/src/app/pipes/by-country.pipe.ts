import {Pipe, PipeTransform} from '@angular/core';
import {IRow} from '../interfaces/table';

@Pipe({
  name: 'byCountry'
})
export class ByCountryPipe implements PipeTransform {

  transform(rows: IRow[], searchTerm: any): any {
    console.log('countries in pipe', rows);
    console.log('searchTerm', searchTerm);
    if (!rows || !searchTerm) {
      return rows;
    }
    return rows.filter((row) => {

      return row.Country.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }

}
