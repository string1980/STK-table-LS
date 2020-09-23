import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TestListService} from '../services/testList.service';
import {IRow} from '../interfaces/table';
import {YesNoComponent} from '../dialogs/yes-no/yes-no.component';
import {MatDialog} from '@angular/material/dialog';
import {CurrentUserModel} from '../interfaces/current-user.model';

@Component({
  selector: 'app-hellopnpjs-web-part',
  templateUrl: './hellopnpjs-web-part.component.html',
  styleUrls: ['./hellopnpjs-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HellopnpjsWebPartComponent implements OnInit {
  @Input() itemID: number;
  rowsFromServer: IRow[] = [];
  displayedColumns: string[] = [];
  allowMultiSelect = true;
  selectedRows: Array<IRow> = [];
  selectedRow: IRow;
  isChecked: boolean = false;
  newListTitle: string = 'Sales Data';
  selectedRowIndex: number;
  isSelected: boolean;
  rowChecked: boolean;
  version: IRow;
  versionStatus: IRow;
  showYesNoDialog: boolean = false;
  jan21USD: number = null;
  currentUser: CurrentUserModel;
  showUSDResult: boolean = false;
  rowsFromServerByUser: IRow[] = [];


  constructor(private testListService: TestListService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getUser();
    this.getAllListItems();
  }


  public getAllListItems() {
    this.testListService.getAllItems().then((result: IRow[]) => {
      if (result !== null && result !== undefined) {
        this.rowsFromServer = result;
        this.rowsFromServer.forEach((x, index) => {
          this.displayedColumns.push(Object.keys(x)[index]);
        });
        this.displayedColumns = this.displayedColumns.filter(col => col === '' || col && !col.startsWith('odata'));
        this.displayedColumns = this.displayedColumns.map((item) => {
          item = item.replace(/_/g, '')
            .replace(/x002d/g, '-')
            .replace(/x0020/g, ' ')
            .replace(/x005c/g, '/')
            .replace(/x0025/g, '%');
          return item;
        }).filter(column =>
          column !== 'FileSystemObjectType' &&
          column !== 'Id' &&
          column !== 'ID' &&
          column !== 'ServerRedirectedEmbedUri' &&
          column !== 'ServerRedirectedEmbedUrl' &&
          column !== 'ContentTypeId' &&
          column !== 'ComplianceAssetId' &&
          column !== 'AuthorId' &&
          column !== 'EditorId' &&
          column !== 'ODataUIVersionString' &&
          column !== 'ODataUIVersionString' &&
          column !== 'GUID' &&
          column !== 'Attachments' &&
          column !== 'Modified' &&
          column !== 'Created' &&
          column !== 'Version' &&
          column !== 'Submitted by' &&
          column !== 'Update date' &&
          column !== 'Comments' &&
          column !== 'Status' &&
          column !== 'UsersId' &&
          column !== 'UsersStringId'
        );
        console.log('displayedColumns', this.displayedColumns);
        this.rowsFromServer.forEach(row => {
          row.UsersId.forEach(id => {
            if (id === this.currentUser.Id) {
              console.log('good');
              this.rowsFromServerByUser.push(row);
            }

          });
        });
        console.log('rowsFromServer by user', this.rowsFromServer);

      } else {
        this.rowsFromServer = [];
      }

      // this.rowsFromServer = this.rowsFromServer.filter(row => row.UsersId. === this.currentUser.Title);
    });


    console.log('filter by user', this.rowsFromServer);

  }

  public getUser() {
    this.testListService.getUser().then(user => {
      console.log('User', user);
      this.currentUser = user;
    })
  }


  onCheck(row: IRow, event, index: number) {
    this.selectedRowIndex = this.rowsFromServer.indexOf(row);
    this.isSelected = this.selectedRowIndex === index;
    console.log('selected row index', this.isSelected);
    if (event.target.checked) {
      this.rowChecked = true;
      row.checked = event.target.checked;
      this.selectedRows.push(row);
    } else {
      this.rowChecked = false;
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
    }
    // this.cdr.detectChanges();
    console.log('Selected rows', this.selectedRows);
  }


  onSubmitTemplateBased(tableForm) {

    console.log('Table form', tableForm);

    this.testListService.addColumns(this.selectedRows).then(res => {
      console.log('Columns successfully added');
    });
  }

  openYesNoDialog() {
    this.showYesNoDialog = true;
    // const dialogRef = this.dialog.open(YesNoComponent);
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     //  TODO: redirect to another page
    //   }
    // });
    // this.cdr.detectChanges();
  }


  onCalculateUSD(row: IRow) {
    console.log('this.selectedRowIndex', this.selectedRowIndex);
    this.showUSDResult = true;
    this.selectedRowIndex = this.rowsFromServer.indexOf(row);
    this.jan21USD = +row.EC_x0020_Sales_x0020_Price * +row.Jan_x002d_20_x0020_Qty;
    this.rowsFromServerByUser[this.selectedRowIndex].Jan_x002d_20_x0020_USD = this.jan21USD;
      // this.jan21USD.push(result);

    console.log('jan21USD result ',this.rowsFromServerByUser[this.selectedRowIndex].Jan_x002d_20_x0020_USD);
    // if(this.rowsFromServer[this.selectedRowIndex].Jan_x002d_20_x0020_USD){
    //   this.rowsFromServer[this.selectedRowIndex].Jan_x002d_20_x0020_USD = row.EC_x0020_Sales_x0020_Price * row.Jan_x002d_20_x0020_Qty
    // }
    // console.log(index);
    // this.rowsFromServer[index].Jan_x002d_20_x0020_USD = row.Jan_x002d_20_x0020_Qty * row.EC_x0020_Sales_x0020_Price;
    // this.Jan_x002d_20_x0020_USD = row.Jan_x002d_20_x0020_Qty * row.EC_x0020_Sales_x0020_Price;
  }

  onYesButton(event: boolean) {
    this.showYesNoDialog = event;
    //  TODO: redirect to Home page
  }

  onNoButton(event: boolean) {
    this.showYesNoDialog = event;
  }

  onCalc(row) {


  }
  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
