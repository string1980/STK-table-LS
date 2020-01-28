import { Injectable } from "@angular/core";
import { PnPBaseService } from './pnpBase.service';
import { IListItem } from './../interfaces/testlist.interface';

@Injectable()

export class TestListService {
    public listName = 'TestList';

    constructor(public pnpBaseService: PnPBaseService) {}

    public getAllItems() {
      return this.pnpBaseService.get(this.listName).then((result: IListItem) => {
         return result;
      });
    }

    public getById(item: IListItem) {
      return this.pnpBaseService.getItemById(this.listName, item.Id).then((result: IListItem) => {
        return result;
      });
    }

    public addItem(item: IListItem) {
      return this.pnpBaseService.add(this.listName, item).then((result: IListItem) => {
        return result;
      });
    }

    public updateItem(item: IListItem) {
      return this.pnpBaseService.update(this.listName, item.Id, item).then((result: IListItem) => {
        return result;
      });
    }

    public deleteItem(item: IListItem) {
      return this.pnpBaseService.delete(this.listName, item.Id).then((result: IListItem) => {
        return result;
      });
    }
}
