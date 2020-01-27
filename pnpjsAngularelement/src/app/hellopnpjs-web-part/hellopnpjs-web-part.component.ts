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
        this.item = {
          Id: res.Id,
          Title: res.Title
        };
      });
    }
  }

}
