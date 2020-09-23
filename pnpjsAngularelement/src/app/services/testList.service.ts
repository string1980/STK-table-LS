import {Injectable, Optional} from '@angular/core';
import {PnPBaseService} from './pnpBase.service';
import {IListItem} from '../interfaces/testlist.interface';
import {IRow} from '../interfaces/table';
import {skip} from 'rxjs/operators';
import {CurrentUserModel} from '../interfaces/current-user.model';

@Injectable()

export class TestListService {
  public listName = 'MasterDataList';

  constructor(public pnpBaseService: PnPBaseService) {
  }

  public getAllItems() {
    return this.pnpBaseService.getMasterDataList(this.listName).then((result: IRow[]) => {
      console.log('Items', result);
      return result;
    });
  }

  public getUser() {
    return this.pnpBaseService.getCurrentUser().then((user: CurrentUserModel) => {
      console.log('User', user);
      return user;
    });
  }

  public addColumns(row: IRow[]) {
    return this.pnpBaseService.addColumnsToSalesDataList(row).then((result) => {
      console.log('Result', row);
      return result;
    });
  }

  // public getById(item: IListItem) {
  //   return this.pnpBaseService.getItemById(this.listName, item.Id).then((result: IListItem) => {
  //     return result;
  //   });
  // }

  // public addItem(item: IListItem) {
  //   return this.pnpBaseService.add(this.listName, item).then((result: IListItem) => {
  //     return result;
  //   });
  // }

  // public updateItem(item: IListItem) {
  //   return this.pnpBaseService.update(this.listName, item.Id, item).then((result: IListItem) => {
  //     return result;
  //   });
  // }

  // public deleteItem(item: IListItem) {
  //   return this.pnpBaseService.delete(this.listName, item.Id).then((result: IListItem) => {
  //     return result;
  //   });
  // }
}
