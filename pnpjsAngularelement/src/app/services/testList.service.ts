import { Injectable } from "@angular/core";
import { PnPBaseService } from './pnpBase.service';

@Injectable()

export class TestListService {
    public listName = 'TestList';

    constructor(public pnpBaseService: PnPBaseService) {}

    public getAllItems(): Promise<any> {
      return this.pnpBaseService.get(this.listName).then((result: any) => {
         return result;
      });
    }

    public getById(itemId: any): Promise<any> {
      return this.pnpBaseService.getById(this.listName, itemId).then((result: any) => {
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
