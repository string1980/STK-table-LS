import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TestListService } from './../services/testList.service';
import { IListItem } from './../interfaces/testlist.interface';

@Component({
  selector: 'app-hellopnpjs-web-part',
  templateUrl: './hellopnpjs-web-part.component.html',
  styleUrls: ['./hellopnpjs-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HellopnpjsWebPartComponent implements OnInit {
  @Input() itemID: number;
  public allItems: any;
  public item: IListItem;
  public id: number;
  public title: string;

  constructor(private testListService: TestListService) { }

  ngOnInit() {
    this.getAllListItems();
  }

  public getAllListItems() {
    this.testListService.getAllItems().then((result: IListItem) => {
      if (result !== null && result !== undefined) {
        this.allItems = result;
      } else {
        this.allItems = [];
      }
    });
  }

  public getItemByID(itemid: any) {
    const item: IListItem = {
      Id: itemid.value
    };

    if (item !== null && item !== undefined) {
      this.testListService.getById(item).then((res: IListItem) => {
        if (res !== null && res !== undefined) {
          this.id = res.Id;
          this.title = res.Title;
        }
      });
    }
  }

  public addItem(item: any) {
    if (item !== null && item !== undefined) {
      const itm: IListItem = {
        Title: item.value
      };

      this.testListService.addItem(itm).then((res: IListItem) => {
        if (res !== null && res !== undefined) {
          this.getAllListItems();
        }
      });
    }
  }

  public updateItem(itemID: any, item: any) {
    const updateItem: IListItem = {
      Id: itemID.value,
      Title: item.value
    };

    if (item !== null && item !== undefined) {
      this.testListService.updateItem(updateItem).then((res: IListItem) => {
        if (res !== null && res !== undefined) {
          this.getAllListItems();
        }
      });
    }

  }

  public deleteItem(item: any) {
    if (item !== null && item !== undefined) {
      const itm: IListItem = {
        Id: item.Id
      };

      this.testListService.deleteItem(itm).then((res: IListItem) => {
        if (res !== null && res !== undefined) {
          this.getAllListItems();
        }
      });
    }
  }

}
