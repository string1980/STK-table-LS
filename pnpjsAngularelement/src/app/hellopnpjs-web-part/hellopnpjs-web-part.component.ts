import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {TestListService} from '../services/testList.service';
import {IRow} from '../interfaces/table';
import {CurrentUserModel} from '../interfaces/current-user.model';
import {PnPBaseService} from '../services/pnpBase.service';
import {IMoreInfo} from '../interfaces/more-info';
import {UUID} from 'angular2-uuid';
import {IVersionManagement} from '../interfaces/version-management';

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
  showClearButton: boolean = false;
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
  rowsByCountry: IRow[] = [];
  uuidValue: string = '';
  // salesVersions: IVersionManagement[] = [];
  versionsList: IVersionManagement[] = [];
  isShowDropDownForVersions: boolean = false;
  selectedVersion: IVersionManagement;
  defaultVersion: string = '';
  defaultVersionType: string = '';
  showNotificationContainer: boolean = false;
  selectedVersionTitle: string = '';
  selectedVersionType: string = '';
  showMessageNoData: boolean = false;

  constructor(private testListService: TestListService, private pnpService: PnPBaseService, private render: Renderer2) {
  }

  ngOnInit() {
    this.uuidValue = UUID.UUID();
    this.getUser();
    this.getAllListItems();

  }

  /**
   * Get versions  from Sharepoint list 'Versions Management'
   */

  getVersionsManagementList(rowsFromServerByUser) {
    console.log(rowsFromServerByUser);
    // this.testListService.getVersionsManagementItems().then((res: IVersionManagement[]) => {
    //   if (res !== null && res !== undefined) {
    //     this.versionsList = res.filter((row) => row.TheReleventList === 'Sales' && row.FormStatus === 'Available');
    //     if (this.versionsList.length > 0) {
    //       this.defaultVersion = this.versionsList[0].Title;
    //       this.defaultVersionType = this.versionsList[0].VersionType;
    //       const rowsFilteredByVersionType = this.rowsFromServerByUser.filter((el) => el.VersionType === this.defaultVersionType);
    //       // this.rowsFromServerByUser = this.getLocalStorage();
    //
    //       console.log('---', rowsFilteredByVersionType);
    //       // const rowsByVersionType = this.rowsFromServerByUser.filter(row => row.VersionType === this.defaultVersionType);
    //       // console.log(rowsByVersionType);
    //       // this.setLocalStorage(rowsByVersionType);
    //       // console.log('from ls', this.getLocalStorage());
    //       if (this.defaultVersion) {
    //         this.showClearButton = true;
    //       }
    //
    //     } else {
    //       this.showNotificationContainer = true;
    //       this.showClearButton = false;
    //     }
    //
    //     // this.rowsFromServerByUser = this.getLocalStorage();
    //   }
    // });
  }


  /**
   * Get all items from 'Master Data List'
   */
  public getAllListItems() {
    this.rowsFromServer = [];
    this.testListService.getAllItems().then((result: IRow[]) => {
      if (result !== null && result !== undefined && result.length > 0) {
        this.rowsFromServer = result;
        if (this.rowsFromServer.length > 0) {
          this.rowsFromServer.forEach((x, index) => {
            this.displayedColumns.push(Object.keys(x)[index]);
          });
        }


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
          column !== 'UsersStringId' &&
          column !== 'Version Type'
        );

        this.displayedColumns = this.displayedColumns.map(column => {
          column = column.replace(/[^a-zA-Z ]/g, '');
          return column;
        });
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


  }

  /**
   * Show table by User
   * @param rowsFromServer: IRow[]
   */

  showDataByUser(rowsFromServer: IRow[]) {
    if (rowsFromServer.length > 0) {
      rowsFromServer.forEach(row => {
        row.UsersId.forEach(id => {
          if (id === this.currentUser.Id) {
            this.rowsFromServerByUser.push(row);

            this.rowsFromServerByUser.forEach((item) => {
              item.checked = false;
              this.countries.push(item.Country);
            });
            this.countries = this.countries.filter((el, index) => this.countries.indexOf(el) === index);
          }
        });

      });
      // this.getVersionsManagementList(this.rowsFromServerByUser);

      // if (this.getLocalStorage() === null) {
      //   this.setLocalStorage(this.rowsFromServerByUser);
      //
      // } else {
      //   const rowsFilteredByVersionType = this.rowsFromServerByUser.filter(el => el.VersionType === this.defaultVersionType);
      //   this.setLocalStorage(rowsFilteredByVersionType);
      // }

    }
    this.testListService.getVersionsManagementItems().then((res: IVersionManagement[]) => {
      if (res !== null && res !== undefined) {
        this.versionsList = res.filter((row) => row.TheReleventList === 'Sales' && row.FormStatus === 'Available');
        if (this.versionsList.length > 0) {
          this.defaultVersion = this.versionsList[0].Title;
          console.log('default version', this.defaultVersion);
          this.defaultVersionType = this.versionsList[0].VersionType;
          this.rowsFromServerByUser = this.rowsFromServerByUser.filter((el) => el.VersionType === this.defaultVersionType);
          this.setLocalStorage(this.rowsFromServerByUser);

          console.log('---', this.rowsFromServerByUser);
          // const rowsByVersionType = this.rowsFromServerByUser.filter(row => row.VersionType === this.defaultVersionType);
          // console.log(rowsByVersionType);
          // this.setLocalStorage(rowsByVersionType);
          // console.log('from ls', this.getLocalStorage());
          if (this.defaultVersion) {
            this.showClearButton = true;
          }

        } else {
          this.showNotificationContainer = true;
          this.showClearButton = false;
        }

        // this.rowsFromServerByUser = this.getLocalStorage();
      }
    });


  }

  /**
   * Get user from Sharepoint
   */
  public getUser() {
    this.testListService.getUser().then(user => {
      this.currentUser = user;
    });
  }

  /**
   * On check row in table (click on checkbox)
   * @param row: IRow
   * @param event: any
   * @param index: number
   */
  onCheck(row: IRow, event, index: number) {
    this.isDisableSaveBtn = false;
    this.rowsFromServerByUser = this.getLocalStorage();
    this.selectedRowIndex = this.rowsFromServer.indexOf(row);
    this.isSelected = this.selectedRowIndex === index;
    if (event.target.checked === true) {
      this.rowChecked = true;

      row.checked = this.rowsFromServerByUser[index].checked = event.target.checked;

      this.setLocalStorage(this.rowsFromServerByUser);

      this.selectedRows.push(row);
      if (this.selectedRows[index] || this.rowsFromServerByUser[index]) {
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

      } else {
        row.checked = false;
      }
    } else {
      this.rowChecked = false;
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
      row.checked = false;
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

  }

  // ------------------------------------------- Disable inputs in table --------------------------------------------
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

// ---------------------------------------------------------------------------------------------------------------

// ------------------------------------------------- Enable tables input -----------------------------------------
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

  /**
   * Click on Save in table
   * @param tableForm: any
   * @param version: string
   * @param status: string
   * @param submittedBy: string
   * @param comment: string
   */
  onSubmitTemplateBased(tableForm: any, version: string, status: string, submittedBy: string, comment: string) {

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
    });

    this.submittedBy = this.currentUser.Title;
    const day = String(new Date().getDate());
    const month = String(new Date().getMonth() + 1);
    const year = String(new Date().getFullYear());

    const updateDate = (day + '/' + month + '/' + year);
    this.updateDate = updateDate;

    const moreInfo: IMoreInfo = {
      version: this.defaultVersion || this.selectedVersionTitle,
      status,
      updateDate,
      submittedBy: this.submittedBy,
      comment

    };
    this.selectedRows.forEach((row) => {
      row.RowUuID = this.uuidValue;
      row.MasterDataID = row.ID;

      // row.Title = this.defaultVersion || this.selectedVersionTitle;
      row.Version = this.defaultVersion || this.selectedVersionTitle;
      row.VersionType = this.defaultVersionType || this.selectedVersion.VersionType;
      row.SubmittedbyUserId = this.currentUser.Id;
    });

    console.log('on save selected rows', this.selectedRows);


// ----------------Todo: uncomment this------------
    this.testListService.addColumns(this.selectedRows, moreInfo).then(res => {
      this.isDisableSaveBtn = true;
      this.selectedRows = [];
      // this.rowsFromServerByUser = this.getLocalStorage();
      this.rowsFromServerByUser.forEach((item => {
        item.Jan_x002d_20_x0020_Qty = null;
        item.Jan_x002d_20_x0020_USD = null;
        item.Feb_x002d_20_x0020_Qty = null;
        item.Feb_x002d_20_x0020_USD = null;
        item.Mar_x002d_20_x0020_Qty = null;
        item.Mar_x002d_20_x0020_USD = null;
        item.Apr_x002d_20_x0020_Qty = null;
        item.Apr_x002d_20_x0020_USD = null;
        item.May_x002d_20_x0020_Qty = null;
        item.May_x002d_20_x0020_USD = null;
        item.Jun_x002d_20_x0020_Qty = null;
        item.Jun_x002d_20_x0020_Qty = null;
        item.Jul_x002d_20_x0020_Qty = null;
        item.Jul_x002d_20_x0020_USD = null;
        item.Aug_x002d_20_x0020_Qty = null;
        item.Aug_x002d_20_x0020_USD = null;
        item.Sep_x002d_20_x0020_Qty = null;
        item.Sep_x002d_20_x0020_USD = null;
        item.Oct_x002d_20_x0020_Qty = null;
        item.Oct_x002d_20_x0020_USD = null;
        item.Nov_x002d_20_x0020_Qty = null;
        item.Nov_x002d_20_x0020_USD = null;
        item.Dec_x002d_20_x0020_Qty = null;
        item.Dec_x002d_20_x0020_USD = null;
        item.Annual_x0020_QTY = null;
        item.Annual_x0020_Sales = null;
        item.checked = false;

      }));
      this.selectedRows.forEach((row) => {
        row.checked = false;
      });
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
        this.isDisableSaveBtn = true;
        this.notification = {
          background: '#772014',
          message: 'Something went wrong!'
        };
        setTimeout(() => {
          this.showNotification = false;
          this.selectedRows = [];
        }, 5000);
      }
      this.testListService.getVersionsManagementItems().then((res: IVersionManagement[]) => {
        if (res !== null && res !== undefined) {
          console.log('versions list', res);
          this.versionsList = res.filter((row) => row.TheReleventList === 'Sales' && row.FormStatus === 'Available');
          this.defaultVersion = this.versionsList[0].Title;
          this.defaultVersionType = this.versionsList[0].VersionType;
          this.rowsFromServerByUser = this.rowsFromServerByUser.filter((el) => el.VersionType === this.defaultVersionType);
          this.setLocalStorage(this.rowsFromServerByUser);


          console.log('---', this.rowsFromServerByUser);
          // const rowsByVersionType = this.rowsFromServerByUser.filter(row => row.VersionType === this.defaultVersionType);
          // console.log(rowsByVersionType);
          // this.setLocalStorage(rowsByVersionType);
          // console.log('from ls', this.getLocalStorage());
          if (this.defaultVersion) {
            this.showClearButton = true;
          }

        } else {
          this.showNotificationContainer = true;
          this.showClearButton = false;
        }

        // this.rowsFromServerByUser = this.getLocalStorage();

      });

      this.resetFields();
      // Todo: reset the rows by version type


      const newRowsFromServer: IRow[] = [];
      this.rowsFromServer.forEach(row => {
        row.UsersId.forEach(id => {
          if (id === this.currentUser.Id) {
            newRowsFromServer.push(row);
            newRowsFromServer.forEach(el => el.checked = false);
          }
        });

      });
      // this.rowsFromServerByUser.forEach(item => item.checked === false);
      this.setLocalStorage(newRowsFromServer);
      this.rowsFromServerByUser = this.getLocalStorage();
      // this.getAllDataFromServer(this.rowsFromServer);

      // Todo: get all items from server by user
    });
    // ----------------Todo: uncomment this------------

  }

  resetFields() {
    this.comment = '';
    this.defaultVersion = '';
    this.selectedVersionTitle = '';
    this.selectedCountry = '';
    this.showClearButton = false;
    this.defaultVersionType = '';
    this.isShowDropDown = false;
    this.isShowDropDownForVersions = false;
    this.selectedVersionType = '';
    this.submittedBy = '';
    this.updateDate = '';
    this.rowsFromServerByUser.forEach(item => {
      item.checked = false;
    });
  }

  // getAllDataFromServer(rowsFromServer) {
  //   console.log(rowsFromServer);
  //   this.rowsFromServerByUser = [...rowsFromServer];
  //
  //   // this.rowsFromServerByUser.forEach(row => {
  //   //   row.UsersId.forEach(id => {
  //   //     if (id === this.currentUser.Id) {
  //   //       this.rowsFromServerByUser.forEach((item) => {
  //   //         item.checked = false;
  //   //
  //   //
  //   //         this.countries.push(item.Country);
  //   //       });
  //   //       this.countries = this.countries.filter((el, index) => this.countries.indexOf(el) === index);
  //   //     }
  //   //   });
  //   // });
  //   // rowsFromServer.forEach(row => {
  //   //   row.UsersId.forEach(id => {
  //   //     if (id === this.currentUser.Id) {
  //   //       // this.rowsFromServerByUser.push(row);
  //   //
  //   //       this.rowsFromServerByUser.forEach((item) => {
  //   //         item.checked = false;
  //   //
  //   //
  //   //         this.countries.push(item.Country);
  //   //       });
  //   //       this.countries = this.countries.filter((el, index) => this.countries.indexOf(el) === index);
  //   //     }
  //   //   });
  //   //
  //   // });
  //   console.log('ccc', this.rowsFromServerByUser);
  //   if (this.getLocalStorage() !== null) {
  //     // localStorage.removeItem('update');
  //     // this.setLocalStorage(this.rowsFromServerByUser);
  //     // this.rowsFromServerByUser = this.getLocalStorage();
  //   }
  //
  // }

  /**
   * Click on 'Cancel' button
   */
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

  /**
   * Write table data to LocalStorage
   * @param rowsFromServerByUser: IRow[]
   */

  setLocalStorage(rowsFromServerByUser: IRow[]) {
    localStorage.setItem('user__rows__by__version', JSON.stringify(rowsFromServerByUser));
  }

  /**
   * Get table data from LocalStorage
   */
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('user__rows__by__version'));
  }

  /**
   * Click on 'Yes' button in dialog and redirect to 'Home' page
   * @param event: boolean
   */
  onYesButton(event: boolean) {
    this.showYesNoDialog = event;
    //  TODO: redirect to Home page
    window.location.href = 'https://stocktonag.sharepoint.com/sites/Budget';
  }

  /**
   * Click on 'No' button to close the dialog
   * @param event: any
   */
  onNoButton(event: boolean) {
    this.showYesNoDialog = event;

  }

  /**
   * TrackBy function for *ngFor in table
   * @param index: number
   * @param obj: any
   */
  customTrackBy(index: number, obj: any): any {
    return index;
  }

  /**
   * Choose country from the dropdown
   * @param country: string
   * @param rows: IRow[]
   */
  onSelectCountry(country: string, rows: IRow[]) {
    this.selectedCountry = country;
    this.isShowDropDown = false;
    // this.rowsFromServerByUser = this.rowsFromServerByUser.filter((el) => el.VersionType === this.defaultVersionType);

    this.rowsByCountry = this.rowsFromServerByUser.filter(row => row.Country === country);
    if (this.rowsByCountry.length === 0) {
      this.showMessageNoData = true;
    }
    this.setLocalStorage(this.rowsByCountry);


  }

  /**
   * Choose version from the dropdown
   * @param version: IVersionManagement
   */
  onSelectVersion(version: IVersionManagement) {
    if (version) {
      this.selectedVersion = version;
      this.showClearButton = true;
      this.selectedVersionTitle = this.selectedVersion.Title;
      this.selectedVersionType = this.selectedVersion.VersionType;
      console.log('on select version type', this.selectedVersionType);
      // this.defaultVersion = this.selectedVersionTitle;
      // this.defaultVersionType = this.selectedVersionType;
      this.testListService.getVersionsManagementItems().then((res: IVersionManagement[]) => {
        if (res !== null && res !== undefined) {
          this.versionsList = res.filter((row) => row.TheReleventList === 'Sales' && row.FormStatus === 'Available').filter(i=> i.VersionType === this.selectedVersionType);
          console.log('versions list', this.versionsList);
          this.rowsFromServerByUser = [];
          // this.getAllListItems();
          console.log('--row by user',this.rowsFromServerByUser);

          const rowsByVersionType = this.versionsList.filter(row => row.VersionType === this.selectedVersionType);
          console.log('rowsByVersionType', rowsByVersionType);
          // this.setLocalStorage(rowsByVersionType);
          // this.defaultVersion = this.versionsList[0].Title;
          // this.defaultVersionType = this.versionsList[0].VersionType;
          // this.rowsFromServerByUser = this.rowsFromServerByUser.filter((el) => el.VersionType ===  this.selectedVersionType);
          // this.setLocalStorage(this.rowsFromServerByUser);


          // console.log('on select version', this.rowsFromServerByUser);
          // const rowsByVersionType = this.rowsFromServerByUser.filter(row => row.VersionType === this.defaultVersionType);
          // console.log(rowsByVersionType);
          // this.setLocalStorage(rowsByVersionType);
          // console.log('from ls', this.getLocalStorage());
          if (this.defaultVersion) {
            this.showClearButton = true;
          }

        } else {
          this.showNotificationContainer = true;
          this.showClearButton = false;
        }

        // this.rowsFromServerByUser = this.getLocalStorage();

      });

      const rowsFilteredByVersionType = this.rowsFromServerByUser.filter(row => row.VersionType === this.selectedVersion.VersionType);
      console.log('rowsFilteredByVersionType', rowsFilteredByVersionType);
    }
    this.isShowDropDownForVersions = false;
    // TODO: filter by version type
    // if (this.getLocalStorage() !== null) {
    //   localStorage.removeItem('user__rows__by__version');
    //   this.setLocalStorage(rowsFilteredByVersionType);
    //
    // }
    // this.rowsFromServerByUser = this.getLocalStorage();
  }

  /**
   * Click on 'Country' input to show dropdown
   */
  onCountryInput() {
    this.isShowDropDown = true;
  }

  /**
   * Click on 'Clear' button to clear selected country
   */
  onClearDropdownSelection() {
    this.selectedCountry = '';
    this.isShowDropDown = true;
    this.rowsFromServerByUser.forEach(item => {
      item.checked = false;
    });
    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  /**
   * Click on 'Clear' button to clear selected version
   */
  onClearDropdownSelectionForVersion() {
    this.selectedVersionTitle = '';
    this.selectedVersionType = '';
    this.isShowDropDownForVersions = true;
    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

// ------------------------ Calculations per table's input -------------------------------------------------
  onCalculateJan_USD(row: IRow, input: number, index, event) {
    // this.rowsFromServerByUser = this.getLocalStorage();

    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);
    this.JanQty = input;
    this.JanUSD = input * this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD = Number(this.JanUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_Qty = Number(this.JanQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD = null;
    // }


    // this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD = null;
    // this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_Qty = null;

    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);
    this.setLocalStorage(this.rowsFromServerByUser);


    // this.selectedRows[rowIndex].Jan_x002d_20_x0020_USD = this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD;


  }

  onCalculateFeb_USD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.FebQty = input;
    this.FebUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD = Number(this.FebUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_Qty = Number(this.FebQty.toFixed(3));

    // if (this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD = null;
    //   this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_Qty = null;
    // }


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
    this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_Qty = Number(this.MarQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_Qty === 0) {
    //   console.log('jqty', this.JanQty);
    //   this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_USD = null;
    // }


    // this.selectedRows[rowIndex].Feb_x002d_20_x0020_USD = this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD;


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateApril_USD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.AprQty = input;
    this.AprUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_USD = Number(this.AprUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_Qty = Number(this.AprQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateMayUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.MayQty = input;
    this.MayUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_USD = Number(this.MayUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_Qty = Number(this.MayQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateJuneUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JunQty = input;
    this.JunUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_USD = Number(this.JunUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_Qty = Number(this.JunQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateJulUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.JulQty = input;
    this.JulUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_USD = Number(this.JulUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_Qty = Number(this.JulQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateAugUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.AugQty = input;
    this.AugUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_USD = Number(this.AugUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_Qty = Number(this.AugQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateSepUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.SepQty = input;
    this.SepUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_USD = Number(this.SepUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_Qty = Number(this.SepQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);


    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateOctUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.OctQty = input;
    this.OctUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_USD = Number(this.OctUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_Qty = Number(this.OctQty.toFixed(3));
    // if (this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateNovUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.NovQty = input;
    this.NovUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_USD = Number(this.NovUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_Qty = Number(this.NovQty.toFixed(3));

    // if (this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_USD === 0) {
    //   this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_USD = null;
    //   this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_USD = null;
    // }


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);

    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
  }

  onCalculateDecUSD(row: IRow, input: number, index: any) {
    const rowIndex = this.selectedRowIndex = this.rowsFromServerByUser.indexOf(row);

    this.DecQty = input;
    this.DecUSD = input * +this.rowsFromServerByUser[rowIndex].EC_x0020_Sales_x0020_Price;
    this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_USD = Number(this.DecUSD.toFixed(3));
    this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_Qty = Number(this.DecQty.toFixed(3));

    // if (this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_Qty === 0) {
    //   this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_Qty = null;
    //   this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_USD = null;
    // }
    // this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_USD = null;
    // this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_Qty = null;


    this.calculateAnnualQtyOnInput(rowIndex);
    this.calculateAnnualUSDOnInput(rowIndex);


    this.setLocalStorage(this.rowsFromServerByUser);
    this.rowsFromServerByUser = this.getLocalStorage();
    this.DecUSD = 0;
  }


  calculateAnnualUSDOnInput(rowIndex) {
    // tslint:disable-next-line:max-line-length

    // this.rowsFromServerByUser[this.selectedRowIndex].Annual_x0020_Sales = 0;

    this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales =
      this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_USD +
      this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_USD;

    //
    //
    // // // tslint:disable-next-line:max-line-length
    this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales = Number(this.rowsFromServerByUser[rowIndex].Annual_x0020_Sales.toFixed(3));


  }

  calculateAnnualQtyOnInput(rowIndex) {
    // tslint:disable-next-line:max-line-length
    // this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY = 0;
    this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY =
      this.rowsFromServerByUser[rowIndex].Jan_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Feb_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Mar_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Apr_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].May_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Jun_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Jul_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Aug_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Sep_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Oct_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Nov_x002d_20_x0020_Qty +
      this.rowsFromServerByUser[rowIndex].Dec_x002d_20_x0020_Qty;
    //
    this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY = Number(this.rowsFromServerByUser[rowIndex].Annual_x0020_QTY.toFixed(3));

    this.setLocalStorage(this.rowsFromServerByUser);
  }

// ----------------------------------------------------------------------------------------------------------------
  onSortBy(column: string, i: number) {

  }

  onDisableInputZero(event: KeyboardEvent) {
    // console.log(event);
    // let numbers: number[] = [];
    // numbers.push(event.keyCode);
    // console.log(numbers)
    // if (numbers.length === 1 && event.keyCode === 48) {
    //   return false;
    // }

  }


}

interface INotification {
  background: string;
  message: string;
}
