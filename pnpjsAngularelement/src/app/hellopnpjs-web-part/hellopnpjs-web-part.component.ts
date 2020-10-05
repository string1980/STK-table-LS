import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit, QueryList,
  Renderer2,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TestListService} from '../services/testList.service';
import {IRow} from '../interfaces/table';
import {CurrentUserModel} from '../interfaces/current-user.model';
import {PnPBaseService} from '../services/pnpBase.service';
import {IMoreInfo} from '../interfaces/more-info';

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
  result = 0;
  showNotification: boolean = false;
  notification: INotification = {background: '', message: ''};
  countries: string[] = [];
  isShowDropDown: boolean = false;
  selectedCountry: string = '';
  @ViewChild('dropdown', {static: false}) dropdown: ElementRef;
  @ViewChildren('janQtyRef') janQtyRef: QueryList<ElementRef>;
  @ViewChildren('febQtyRef') febQtyRef: QueryList<ElementRef>;
  @ViewChildren('marQtyRef') marQtyRef: QueryList<ElementRef>;
  @ViewChildren('aprQtyRef') aprQtyRef: QueryList<ElementRef>;
  @ViewChildren('mayQtyRef') mayQtyRef: QueryList<ElementRef>;
  @ViewChildren('juneQtyRef') juneQtyRef: QueryList<ElementRef>;
  @ViewChildren('julQtyRef') julQtyRef: QueryList<ElementRef>;
  @ViewChildren('augQtyRef') augQtyRef: QueryList<ElementRef>;
  @ViewChildren('sepQtyRef') sepQtyRef: QueryList<ElementRef>;
  @ViewChildren('octQtyRef') octQtyRef: QueryList<ElementRef>;
  @ViewChildren('novQtyRef') novQtyRef: QueryList<ElementRef>;
  @ViewChildren('decQtyRef') decQtyRef: QueryList<ElementRef>;
  // @ViewChild('janQtyRef', {static: false}) janQtyRef: QueryList<ElementRef>;
  submittedBy: string = '';
  updateDate: string = '';
  private JanUSD: number = 0;
  private FebUSD: number = 0;
  private MarUSD: number = 0;
  private AprUSD: number = 0;
  private MayUSD: number = 0;
  private JunUSD: number = 0;
  private JulUSD: number = 0;
  private AugUSD: number = 0;
  private SepUSD: number = 0;
  private OctUSD: number = 0;
  private NovUSD: number = 0;
  private DecUSD: number = 0;
  private JanQty: number = 0;
  private FebQty: number = 0;
  private MarQty: number = 0;
  private AprQty: number = 0;
  private MayQty: number = 0;
  private JunQty: number = 0;
  private JulQty: number = 0;
  private AugQty: number = 0;
  private SepQty: number = 0;
  private OctQty: number = 0;
  private NovQty: number = 0;
  private DecQty: number = 0;
  comment: string = '';
  isDisableSaveBtn: boolean = true;


  constructor(private testListService: TestListService, private pnpService: PnPBaseService, private render: Renderer2) {
  }

  ngOnInit() {

    this.getUser();
    this.getAllListItems();
    // if(localStorage.getItem('update') !== null){
    //   this.rowsFromServerByUser = JSON.parse(localStorage.getItem('update'));
    // }
    // this.getItemById();
  }


  public getAllListItems() {
    this.rowsFromServer = [];
    this.testListService.getAllItems().then((result: IRow[]) => {
      if (result !== null && result !== undefined && result.length > 0) {
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
        this.displayedColumns[0] = 'Company';
        this.showDataByUser(this.rowsFromServer);
        // this.rowsFromServer.forEach(row => {
        //   row.UsersId.forEach(id => {
        //     if (id === this.currentUser.Id) {
        //       console.log('good');
        //       this.rowsFromServerByUser.push(row);
        //
        //       this.rowsFromServerByUser.forEach(item => {
        //         this.countries.push(item.Country);
        //       });
        //       this.countries = this.countries.filter((el, index) => this.countries.indexOf(el) === index);
        //       console.log('countries', this.countries);
        //     }
        //
        //   });
        // });
        // console.log('rowsFromServer by user', this.rowsFromServer);

      } else {
        this.rowsFromServer = [];
      }


    });


    console.log('filter by user', this.rowsFromServer);

  }

  showDataByUser(rowsFromServer) {
    rowsFromServer.forEach(row => {
      row.UsersId.forEach(id => {
        if (id === this.currentUser.Id) {
          this.rowsFromServerByUser.push(row);

          this.rowsFromServerByUser.forEach(item => {
            this.countries.push(item.Country);
          });
          this.countries = this.countries.filter((el, index) => this.countries.indexOf(el) === index);
        }
      });

    });

  }

  public getUser() {
    this.testListService.getUser().then(user => {
      console.log('User', user);
      this.currentUser = user;
    });
  }


  onCheck(row: IRow, event, index: number) {
    this.selectedRowIndex = this.rowsFromServer.indexOf(row);
    this.isSelected = this.selectedRowIndex === index;
    if (event.target.checked === true) {
      this.rowChecked = true;
      row.checked = event.target.checked;
      // if (row.checked) {
      //   this.rowChecked = this.rowsFromServerByUser[this.selectedRowIndex].checked = row.checked;
      // }

      this.selectedRows.push(row);
      if (this.selectedRows[index] || this.rowsFromServerByUser[index]) {
        console.log('yes');
        this.removeDisabledForJan(index);
        this.removeDisabledForFeb(index);
        this.removeDisabledForMarch(index);
        this.removeDisabledForApril(index);
        this.removeDisabledForMay(index);
        this.removeDisabledForJune(index);
        this.removeDisabledForJuly(index);
        this.removeDisabledForAugust(index);
        this.removeDisabledForAugust(index);
        this.removeDisabledForSeptember(index);
        this.removeDisabledForOctober(index);
        this.removeDisabledForNovember(index);
        this.removeDisabledForDecember(index);

        // this.render.removeAttribute(this.janQtyRef.nativeElement, 'disabled');
      } else {
        console.log('no no')
      }
    } else {
      this.rowChecked = false;
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
      this.addDisabledForJan(index);
      this.addDisabledForFeb(index);
      this.addDisabledForMat(index);
      this.addDisabledForApr(index);
      this.addDisabledForMay(index);
      this.addDisabledForJune(index);
      this.addDisabledForJuly(index);
      this.addDisabledForAugust(index);
      this.addDisabledForSeptember(index);
      this.addDisabledForOctober(index);
      this.addDisabledForDecember(index);

    }
    // this.cdr.detectChanges();
    console.log('Selected rows', this.selectedRows);


    // this.cdr.detectChanges();
    // console.log('Selected rows', this.selectedRows);
  }

  addDisabledForJan(index) {
    this.janQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForFeb(index) {
    this.febQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForMat(index) {
    this.marQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForApr(index) {
    this.aprQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForMay(index) {
    this.mayQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForJune(index) {
    this.juneQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForJuly(index) {
    this.julQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForAugust(index) {
    this.augQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForSeptember(index) {
    this.sepQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForOctober(index) {
    this.octQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForNovember(index) {
    this.novQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }

  addDisabledForDecember(index) {
    this.decQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.setAttribute(el.nativeElement, 'disabled', 'disabled');
      }
    });
  }


  removeDisabledForJan(index) {
    this.janQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForFeb(index) {
    this.febQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForMarch(index) {
    this.marQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForApril(index) {
    this.aprQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForMay(index) {
    this.mayQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForJune(index) {
    this.juneQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForJuly(index) {
    this.julQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForAugust(index) {
    this.augQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForSeptember(index) {
    this.sepQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForOctober(index) {
    this.octQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForNovember(index) {
    this.novQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }

  removeDisabledForDecember(index) {
    this.decQtyRef.forEach((el, i) => {
      if (index === i) {
        this.render.removeAttribute(el.nativeElement, 'disabled');
      }
    });
  }


  onSubmitTemplateBased(tableForm, version, status, submittedBy, comment) {
    // console.log(tableForm);

    const allTable: IRow[] = this.getLocalStorage();
    this.selectedRows = allTable.filter(a => a.checked);

    this.selectedRows.forEach(item => {
      item.Jan_x002d_20_x0020_Qty = +item.Jan_x002d_20_x0020_Qty;
      item.Feb_x002d_20_x0020_Qty = +item.Feb_x002d_20_x0020_Qty;
      item.Mar_x002d_20_x0020_Qty = +item.Mar_x002d_20_x0020_Qty;
      item.Apr_x002d_20_x0020_Qty = +item.Apr_x002d_20_x0020_Qty;
      item.May_x002d_20_x0020_Qty = +item.May_x002d_20_x0020_Qty;
      item.Jun_x002d_20_x0020_Qty = +item.Jun_x002d_20_x0020_Qty;
      item.Jul_x002d_20_x0020_Qty = +item.Jul_x002d_20_x0020_Qty;
      item.Aug_x002d_20_x0020_Qty = +item.Aug_x002d_20_x0020_Qty;
      item.Sep_x002d_20_x0020_Qty = +item.Sep_x002d_20_x0020_Qty;
      item.Oct_x002d_20_x0020_Qty = +item.Oct_x002d_20_x0020_Qty;
      item.Nov_x002d_20_x0020_Qty = +item.Nov_x002d_20_x0020_Qty;
      item.Dec_x002d_20_x0020_Qty = +item.Dec_x002d_20_x0020_Qty;

      // item.Jan_x002d_20_x0020_Qty = null ? item.Jan_x002d_20_x0020_USD = 0 : item.Jan_x002d_20_x0020_USD = 0;
      // item.Feb_x002d_20_x0020_Qty = null ? item.Feb_x002d_20_x0020_USD = 0 : item.Feb_x002d_20_x0020_USD = 0;
      // item.Mar_x002d_20_x0020_Qty = null ? item.Mar_x002d_20_x0020_USD = 0 : item.Mar_x002d_20_x0020_USD = 0;
      // item.Apr_x002d_20_x0020_Qty = null ? item.Apr_x002d_20_x0020_USD = 0 : item.Apr_x002d_20_x0020_USD = 0;
      // item.May_x002d_20_x0020_Qty = null ? item.May_x002d_20_x0020_USD = 0 : item.May_x002d_20_x0020_USD = 0;
      // item.Jun_x002d_20_x0020_Qty = null ? item.Jun_x002d_20_x0020_USD = 0 : item.Jun_x002d_20_x0020_USD = 0;
      // item.Jul_x002d_20_x0020_Qty = null ? item.Jul_x002d_20_x0020_USD = 0 : item.Jul_x002d_20_x0020_USD = 0;
      // item.Aug_x002d_20_x0020_Qty = null ? item.Aug_x002d_20_x0020_USD = 0 : item.Aug_x002d_20_x0020_USD = 0;
      // item.Sep_x002d_20_x0020_Qty = null ? item.Sep_x002d_20_x0020_USD = 0 : item.Sep_x002d_20_x0020_USD = 0;
      // item.Oct_x002d_20_x0020_Qty = null ? item.Oct_x002d_20_x0020_USD = 0 : item.Oct_x002d_20_x0020_USD = 0;
      // item.Nov_x002d_20_x0020_Qty = null ? item.Nov_x002d_20_x0020_USD = 0 : item.Nov_x002d_20_x0020_USD = 0;
      // item.Dec_x002d_20_x0020_Qty = null ? item.Dec_x002d_20_x0020_USD = 0 : item.Dec_x002d_20_x0020_USD = 0;

    });

    this.submittedBy = this.currentUser.Title;
    const day = String(new Date().getDate());
    const month = String(new Date().getMonth() + 1);
    const year = String(new Date().getFullYear());

    const updateDate = (day + '/' + month + '/' + year);
    this.updateDate = updateDate;

    const moreInfo: IMoreInfo = {
      version,
      status,
      updateDate,
      submittedBy: this.submittedBy,
      comment

    };
    // this.selectedRows = this.rowsFromServerByUser;
    // this.selectedRows = this.selectedRows.filter(a => a.checked);
    console.log('selected rows', this.selectedRows);


    this.testListService.addColumns(this.selectedRows, moreInfo).then(res => {
      if (res) {
        this.showNotification = true;
        this.notification = {
          background: '#306B34',
          message: 'Data successfully saved!'
        };
        setTimeout(() => {
          this.showNotification = false;
          this.selectedRows = [];
        }, 5000);
      } else {
        this.showNotification = true;
        this.notification = {
          background: '#772014',
          message: 'Something went wrong!'
        };
        setTimeout(() => {
          this.showNotification = false;
          this.selectedRows = [];
        }, 5000);
      }

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

  setLocalStorage(rowsFromServerByUser) {
    localStorage.setItem('update', JSON.stringify(rowsFromServerByUser));
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem('update'));
  }

  onYesButton(event: boolean) {
    this.showYesNoDialog = event;
    //  TODO: redirect to Home page
    window.location.href = 'https://stocktonag.sharepoint.com/sites/Budget';
  }

  onNoButton(event: boolean) {
    this.showYesNoDialog = event;
    window.location.href = 'https://stocktonag.sharepoint.com/sites/Budget/SitePages/Sales.aspx';
    return;
    // window.location.href = 'https://stocktonag.sharepoint.com/sites/Budget/SitePages/Sales.aspx';
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  onSelectCountry(country: string) {
    this.selectedCountry = country;
    this.isShowDropDown = false;
    console.log('selected country', this.selectedCountry);
  }

  onCountryInput() {
    this.isShowDropDown = true;
  }

  onClearDropdownSelection() {
    this.selectedCountry = '';
    this.isShowDropDown = true;
  }

  onCalculateJan_USD(row: IRow, input: number, index) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);
    this.JanQty = input;
    this.JanUSD = input * this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD = Number(this.JanUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);
    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

    // this.selectedRows[rowIndex].Jan_x002d_20_x0020_USD = this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD;


  }

  onCalculateFeb_USD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.FebQty = input;
    this.FebUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD = Number(this.FebUSD.toFixed(3));
    // this.selectedRows[rowIndex].Feb_x002d_20_x0020_USD = this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD;

    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateMar_USD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.MarQty = input;
    this.MarUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_USD = Number(this.MarUSD.toFixed(3));

    // this.selectedRows[rowIndex].Feb_x002d_20_x0020_USD = this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD;


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateApril_USD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);
    console.log('April qty', input);
    this.AprQty = input;
    this.AprUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_USD = Number(this.AprUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateMayUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.MayQty = input;
    this.MayUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_USD = Number(this.MayUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateJuneUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JunQty = input;
    this.JunUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_USD = Number(this.JunUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateJulUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JulQty = input;
    this.JulUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_USD = Number(this.JulUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateAugUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.AugQty = input;
    this.AugUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_USD = Number(this.AugUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateSepUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.SepQty = input;
    this.SepUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_USD = Number(this.SepUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);


    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateOctUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.OctQty = input;
    this.OctUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_USD = Number(this.OctUSD.toFixed(3));

    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateNovUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.NovQty = input;
    this.NovUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_USD = Number(this.NovUSD.toFixed(3));

    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

    console.log('after update', this.rowsFromServerByUser);
  }

  onCalculateDecUSD(row: IRow, input: number, i: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.DecQty = input;
    this.DecUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_USD = Number(this.DecUSD.toFixed(3));


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);


    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }


  calculateAnnualUSDOnInput(rowIndex) {
    // tslint:disable-next-line:max-line-length

    // this.rowsFromServerByUser[this.selectedRowIndex].Annual_x0020_Sales = 0;

    this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales =
      this.JanUSD + this.FebUSD + this.MarUSD + this.AprUSD + this.MayUSD + this.JunUSD + this.JulUSD + this.AugUSD + this.SepUSD + this.OctUSD + this.NovUSD + this.DecUSD;


    // // tslint:disable-next-line:max-line-length
    this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales = Number(this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales.toFixed(3));
    console.log(this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales);


  }

  calculateAnnualQtyOnInput(rowIndex) {
    // tslint:disable-next-line:max-line-length
    this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY = this.JanQty + this.FebQty + this.MarQty + this.AprQty + this.MayQty + this.JunQty + this.JulQty + this.AugQty + this.SepQty + this.OctQty + this.NovQty + this.DecQty;


    this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY = Number(this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY.toFixed(3));

  }

  onSortBy(column: string, i: number) {
    console.log('Selected column', column, column);
    console.log('Selected column index', i);
    switch (i) {
      case 0:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Title > b.Title) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Title < b.Title) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 1:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Country > b.Country) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Country < b.Country) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 2:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Item_x0020_Code_x0020_SAP > b.Item_x0020_Code_x0020_SAP) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Item_x0020_Code_x0020_SAP < b.Item_x0020_Code_x0020_SAP) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 3:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Item_x0020_Name > b.Item_x0020_Name) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Item_x0020_Name < b.Item_x0020_Name) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 4:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Sales_x005c_FOC > b.Sales_x005c_FOC) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Sales_x005c_FOC < b.Sales_x005c_FOC) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 5:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Sales_x0020_Type > b.Sales_x0020_Type) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Sales_x0020_Type < b.Sales_x0020_Type) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 6:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Business_x0020_Segment > b.Business_x0020_Segment) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Business_x0020_Segment < b.Business_x0020_Segment) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 7:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Customer_x0020_Code_x0020_SAP > b.Customer_x0020_Code_x0020_SAP) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Customer_x0020_Code_x0020_SAP < b.Customer_x0020_Code_x0020_SAP) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;
      case 8:
        this.rowsFromServerByUser = this.rowsFromServerByUser.sort((a, b) => {
          if (a.Customer_x0020_Name > b.Customer_x0020_Name) {
            console.log('Sorted by country asc', this.rowsFromServerByUser);
            return 1;
          } else if (a.Customer_x0020_Name < b.Customer_x0020_Name) {
            console.log('Sorted by country desc', this.rowsFromServerByUser);
            return -1;
          } else {
            return 0;
          }
        }).filter(a => a.Country === this.selectedCountry);
        break;

    }
  }
}

interface INotification {
  background: string;
  message: string;
}
