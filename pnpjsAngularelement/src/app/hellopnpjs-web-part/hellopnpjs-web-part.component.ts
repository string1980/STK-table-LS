import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { TestListService } from './../services/testList.service';

@Component({
  selector: 'app-hellopnpjs-web-part',
  templateUrl: './hellopnpjs-web-part.component.html',
  styleUrls: ['./hellopnpjs-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HellopnpjsWebPartComponent implements OnInit {
  @Input() description: string;

  constructor(private testListService: TestListService) { }

  ngOnInit() {
    this.getAllListItems();
    this.getItemByID();
  }

  public getAllListItems() {
    const allItems = this.testListService.getAllItems();
    console.log(allItems);
  }

  public getItemByID() {
    const itemId = 1;
    const item = this.testListService.getById(itemId);
    console.log(item[0]);
  }

}
