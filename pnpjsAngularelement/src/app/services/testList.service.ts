import { Injectable } from "@angular/core";
import { PnPBaseService } from './pnpBase.service';
import { IListItem } from './../interfaces/testlist.interface';

@Injectable()

export class TestListService {
    public listName = 'TestList';

    constructor(public pnpBaseService: PnPBaseService) {}

    public getAllItems(): Promise<IListItem> {
      return this.pnpBaseService.get(this.listName).then((result: IListItem) => {
         return result;
      });
    }

    public getById(item: IListItem): Promise<IListItem> {
      return this.pnpBaseService.getById(this.listName, item.Id).then((result: IListItem) => {
        return result;
      });
    }

    public addItem() {

    }

    public updateItem() {

    }

    public deleteItem() {

    }
}
