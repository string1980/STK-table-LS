import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
  submittedBy: string = '';
  updateDate: string = '';
  disableInputTable: boolean;


  // @HostListener('document:click', ['$event'])
  // handleOutsideClick(event) {
  //   if (!this.dropdown.nativeElement.contains(event.target)) {
  //     this.isShowDropDown = false;
  //   }
  // }
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


  constructor(private testListService: TestListService, private pnpService: PnPBaseService) {
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
        console.log('rowsFromServer by user', this.rowsFromServer);

      } else {
        this.rowsFromServer = [];
      }

      // this.rowsFromServer = this.rowsFromServer.filter(row => row.UsersId. === this.currentUser.Title);
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
      //   // this.rowChecked = this.rowsFromServerByUser[this.selectedRowIndex].checked = row.checked;
      // }

      this.selectedRows.push(row);
    } else {
      this.rowChecked = false;
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
    }
    // this.cdr.detectChanges();
    console.log('Selected rows', this.selectedRows);
    // this.cdr.detectChanges();
    // console.log('Selected rows', this.selectedRows);
  }


  onSubmitTemplateBased(tableForm, version, status, submittedBy, comment) {
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
    this.selectedRows.forEach((row, index) => {
      if (this.selectedRowIndex === index) {
        this.selectedRows[index].Jan_x002d_20_x0020_Qty = this.JanQty;
        this.selectedRows[index].Jan_x002d_20_x0020_USD = this.JanUSD;
        this.selectedRows[index].Feb_x002d_20_x0020_Qty = this.FebQty;
        this.selectedRows[index].Feb_x002d_20_x0020_USD = this.FebUSD;
        this.selectedRows[index].Mar_x002d_20_x0020_Qty = this.MarQty;
        this.selectedRows[index].Mar_x002d_20_x0020_USD = this.MarUSD;
        this.selectedRows[index].Apr_x002d_20_x0020_Qty = this.AprQty;
        this.selectedRows[index].Apr_x002d_20_x0020_USD = this.AprUSD;
        this.selectedRows[index].May_x002d_20_x0020_Qty = this.MayQty;
        this.selectedRows[index].May_x002d_20_x0020_USD = this.MayUSD;
        this.selectedRows[index].Jun_x002d_20_x0020_Qty = this.JunQty;
        this.selectedRows[index].Jun_x002d_20_x0020_USD = this.JunUSD;
        this.selectedRows[index].Jul_x002d_20_x0020_Qty = this.JulQty;
        this.selectedRows[index].Jul_x002d_20_x0020_USD = this.JulUSD;
        this.selectedRows[index].Aug_x002d_20_x0020_Qty = this.AugQty;
        this.selectedRows[index].Aug_x002d_20_x0020_USD = this.AugUSD;
        this.selectedRows[index].Sep_x002d_20_x0020_Qty = this.SepQty;
        this.selectedRows[index].Sep_x002d_20_x0020_USD = this.SepUSD;
        this.selectedRows[index].Oct_x002d_20_x0020_Qty = this.OctQty;
        this.selectedRows[index].Oct_x002d_20_x0020_USD = this.OctUSD;
        this.selectedRows[index].Nov_x002d_20_x0020_Qty = this.NovQty;
        this.selectedRows[index].Nov_x002d_20_x0020_USD = this.NovUSD;
        this.selectedRows[index].Dec_x002d_20_x0020_Qty = this.DecQty;
        this.selectedRows[index].Dec_x002d_20_x0020_USD = this.DecUSD;

        this.selectedRows[index].Annual_x0020_QTY =
          this.selectedRows[index].Jan_x002d_20_x0020_Qty +
          this.selectedRows[index].Feb_x002d_20_x0020_Qty +
          this.selectedRows[index].Mar_x002d_20_x0020_Qty +
          this.selectedRows[index].Apr_x002d_20_x0020_Qty +
          this.selectedRows[index].May_x002d_20_x0020_Qty +
          this.selectedRows[index].Jun_x002d_20_x0020_Qty +
          this.selectedRows[index].Jul_x002d_20_x0020_Qty +
          this.selectedRows[index].Aug_x002d_20_x0020_Qty +
          this.selectedRows[index].Sep_x002d_20_x0020_Qty +
          this.selectedRows[index].Oct_x002d_20_x0020_Qty +
          this.selectedRows[index].Nov_x002d_20_x0020_Qty +
          this.selectedRows[index].Dec_x002d_20_x0020_Qty;

        // tslint:disable-next-line:max-line-length
        this.selectedRows[index].Annual_x0020_Sales = 0;

        // tslint:disable-next-line:max-line-length
        this.selectedRows[index].Annual_x0020_Sales = this.JanUSD + this.FebUSD + this.MarUSD + this.AprUSD + this.MayUSD + this.JunUSD + this.JulUSD + this.AugUSD + this.SepUSD + this.OctUSD + this.NovUSD + this.DecUSD;
      }
    });


    // this.selectedRows[this.selectedRowIndex].Jan_x002d_20_x0020_Qty = this.JanQty;
    // this.selectedRows[this.selectedRowIndex].Jan_x002d_20_x0020_USD = this.JanUSD;
    // this.selectedRows[this.selectedRowIndex].Feb_x002d_20_x0020_Qty = this.FebQty;
    // this.selectedRows[this.selectedRowIndex].Feb_x002d_20_x0020_USD = this.FebUSD;
    // this.selectedRows[this.selectedRowIndex].Mar_x002d_20_x0020_Qty = this.MarQty;
    // this.selectedRows[this.selectedRowIndex].Mar_x002d_20_x0020_USD = this.MarUSD;
    // this.selectedRows[this.selectedRowIndex].Apr_x002d_20_x0020_Qty = this.AprQty;
    // this.selectedRows[this.selectedRowIndex].Apr_x002d_20_x0020_USD = this.AprUSD;
    // this.selectedRows[this.selectedRowIndex].May_x002d_20_x0020_Qty = this.MayQty;
    // this.selectedRows[this.selectedRowIndex].May_x002d_20_x0020_USD = this.MayUSD;
    // this.selectedRows[this.selectedRowIndex].Jun_x002d_20_x0020_Qty = this.JunQty;
    // this.selectedRows[this.selectedRowIndex].Jun_x002d_20_x0020_USD = this.JunUSD;
    // this.selectedRows[this.selectedRowIndex].Jul_x002d_20_x0020_Qty = this.JulQty;
    // this.selectedRows[this.selectedRowIndex].Jul_x002d_20_x0020_USD = this.JulUSD;
    // this.selectedRows[this.selectedRowIndex].Aug_x002d_20_x0020_Qty = this.AugQty;
    // this.selectedRows[this.selectedRowIndex].Aug_x002d_20_x0020_USD = this.AugUSD;
    // this.selectedRows[this.selectedRowIndex].Sep_x002d_20_x0020_Qty = this.SepQty;
    // this.selectedRows[this.selectedRowIndex].Sep_x002d_20_x0020_USD = this.SepUSD;
    // this.selectedRows[this.selectedRowIndex].Oct_x002d_20_x0020_Qty = this.OctQty;
    // this.selectedRows[this.selectedRowIndex].Oct_x002d_20_x0020_USD = this.OctUSD;
    // this.selectedRows[this.selectedRowIndex].Nov_x002d_20_x0020_Qty = this.NovQty;
    // this.selectedRows[this.selectedRowIndex].Nov_x002d_20_x0020_USD = this.NovUSD;
    // this.selectedRows[this.selectedRowIndex].Dec_x002d_20_x0020_Qty = this.DecQty;
    // this.selectedRows[this.selectedRowIndex].Dec_x002d_20_x0020_USD = this.DecUSD;
    //
    // this.selectedRows[this.selectedRowIndex].Annual_x0020_QTY =
    //   this.selectedRows[this.selectedRowIndex].Jan_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Feb_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Mar_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Apr_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].May_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Jun_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Jul_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Aug_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Sep_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Oct_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Nov_x002d_20_x0020_Qty +
    //   this.selectedRows[this.selectedRowIndex].Dec_x002d_20_x0020_Qty;
    //
    // // tslint:disable-next-line:max-line-length
    // this.selectedRows[this.selectedRowIndex].Annual_x0020_Sales = 0;
    //
    // tslint:disable-next-line:max-line-length
    // this.selectedRows[this.selectedRowIndex].Annual_x0020_Sales = this.JanUSD + this.FebUSD + this.MarUSD + this.AprUSD + this.MayUSD + this.JunUSD + this.JulUSD + this.AugUSD + this.SepUSD + this.OctUSD + this.NovUSD + this.DecUSD;
    this.testListService.addColumns(this.selectedRows, moreInfo).then(res => {
      // TODO: add comments and other stuff;
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
  }

  onNoButton(event: boolean) {
    this.showYesNoDialog = event;
  }

  onCalc(row) {


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
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JanQty = input;
    this.JanUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Jan_x002d_20_x0020_USD = Number(this.JanUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateFeb_USD(row: IRow, input: number, index: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.FebQty = input;
    this.FebUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Feb_x002d_20_x0020_USD = Number(this.FebUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateMar_USD(row: IRow, input: number, index: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.MarQty = input;
    this.MarUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Mar_x002d_20_x0020_USD = Number(this.MarUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateApril_USD(row: IRow, input: number, index: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.AprQty = input;
    this.AprUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Apr_x002d_20_x0020_USD = Number(this.AprUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateMayUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.MayQty = input;
    this.MayUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].May_x002d_20_x0020_USD = Number(this.MayUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateJuneUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JunQty = input;
    this.JunUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Jun_x002d_20_x0020_USD = Number(this.JunUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateJulUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JulQty = input;
    this.JulUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Jul_x002d_20_x0020_USD = Number(this.JulUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateAugUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.AugQty = input;
    this.AugUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Aug_x002d_20_x0020_USD = Number(this.AugUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }

  onCalculateSepUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.SepQty = input;
    this.SepUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Sep_x002d_20_x0020_USD = Number(this.SepUSD.toFixed(3));


    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();


    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateOctUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.OctQty = input;
    this.OctUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Oct_x002d_20_x0020_USD = Number(this.OctUSD.toFixed(3));

    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateNovUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.NovQty = input;
    this.NovUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Nov_x002d_20_x0020_USD = this.NovUSD;

    this.rowsFromServerByUser[this.selectedRowIndex].Nov_x002d_20_x0020_USD.toFixed(3);

    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

    console.log('after update', this.rowsFromServerByUser);
  }

  onCalculateDecUSD(row: IRow, input: number, i: any) {
    this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.DecQty = input;
    this.DecUSD = input * +this.rowsFromServerByUser[this.selectedRowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[this.selectedRowIndex].Dec_x002d_20_x0020_USD = this.DecUSD;
    this.rowsFromServerByUser[this.selectedRowIndex].Dec_x002d_20_x0020_USD.toFixed(3);

    this.calculateAnnualQtyOnInput();
    this.calculateAnnualUSDOnInput();


    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();

  }


  calculateAnnualUSDOnInput() {
    // tslint:disable-next-line:max-line-length
    this.rowsFromServerByUser[this.selectedRowIndex].Annual_x0020_Sales = this.JanUSD + this.FebUSD + this.MarUSD + this.AprUSD + this.MayUSD + this.JunUSD + this.JulUSD + this.AugUSD + this.SepUSD + this.OctUSD + this.NovUSD + this.DecUSD;
    // tslint:disable-next-line:max-line-length
    this.rowsFromServerByUser[this.selectedRowIndex].Annual_x0020_Sales = Number(this.rowsFromServerByUser[this.selectedRowIndex].Annual_x0020_Sales.toFixed(3));
  }

  calculateAnnualQtyOnInput() {
    // tslint:disable-next-line:max-line-length
    this.rowsFromServerByUser[this.selectedRowIndex].Annual_x0020_QTY = this.JanQty + this.FebQty + this.MarQty + this.AprQty + this.MayQty + this.JunQty + this.JulQty + this.AugQty + this.SepQty + this.OctQty + this.NovQty + this.DecQty;
  }
}

interface INotification {
  background: string;
  message: string;
}
