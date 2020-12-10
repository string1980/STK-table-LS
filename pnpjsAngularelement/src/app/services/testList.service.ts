import {Injectable} from '@angular/core';
import {PnPBaseService} from './pnpBase.service';
import {IRow} from '../interfaces/table';
import {CurrentUserModel} from '../interfaces/current-user.model';
import {IMoreInfo} from '../interfaces/more-info';

@Injectable()

export class TestListService {
  public listName = 'MasterDataList';
  public versionsManagementList = 'Versions Management';

  constructor(public pnpBaseService: PnPBaseService) {
  }

  public getAllItems() {
    return this.pnpBaseService.getMasterDataList(this.listName).then((result: IRow[]) => {
      return result;
    });
  }

  public getVersionsManagementItems() {
    return this.pnpBaseService.getVersionsManagementList(this.versionsManagementList).then((res) => {
      return res;
    });
  }

  public getUser() {
    return this.pnpBaseService.getCurrentUser().then((user: CurrentUserModel) => {
      return user;
    });
  }

  public addColumns(row: IRow[], moreInfo: IMoreInfo) {
    return this.pnpBaseService.addColumnsToSalesDataList(row, moreInfo).then((result) => {
      return result;
    });
  }

  public getById(listName: string, id) {
    return this.pnpBaseService.getItemById(listName, id).then((result: IRow) => {
      return result;
    });
  }

}
