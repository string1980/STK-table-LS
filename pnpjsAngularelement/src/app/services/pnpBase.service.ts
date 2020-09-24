import {Injectable} from '@angular/core';
import {IWeb, sp, SPRest} from '@pnp/sp/presets/all';
import {Web} from '@pnp/sp/webs';
import '@pnp/sp/webs';
import {IRow} from '../interfaces/table';
import {stringIsNullOrEmpty} from '@pnp/common';
import '@pnp/sp/fields';

@Injectable()

export class PnPBaseService {
  private web: IWeb;

  constructor() {
    sp.configure({
      mode: 'no-cors'
    });
    this.web = Web('https://stocktonag.sharepoint.com/sites/Budget');
  }

  public getMasterDataList(listName: string) {
    return new Promise((resolve, reject) => {
      if (sp !== null && sp !== undefined) {
        const items = this.web.lists.getByTitle(listName).items.getAll();
        resolve(items);
      } else {
        reject('Failed getting list data...');
      }
    });
  }

  public getCurrentUser() {
    return new Promise((resolve, reject) => {
      if (sp !== null && sp !== undefined) {
        const currentUser = this.web.currentUser.get();
        resolve(currentUser);
      } else {
        reject('Failed getting list data...');
      }
    });
  }


  // public getItemById(listName: string, itemId: any) {
  //   return new Promise((resolve, reject) => {
  //     if (sp !== null && sp !== undefined) {
  //       const item = sp.web.lists.getByTitle(listName).items.getById(itemId).get();
  //       resolve(item);
  //     } else {
  //       reject('Failed getting list data...');
  //     }
  //   });
  // }

  public addColumnsToSalesDataList(selectedRows: IRow[]) {
    return new Promise((resolve, reject) => {
      if (sp !== null && sp !== undefined) {
        console.log('Selected rows to add', selectedRows);
        selectedRows.forEach((row) => {
          console.log('Country', row.Country);
          this.web.lists.getByTitle('Sales Data Test').items.add({
            Title: row.Title,
            Country: row.Country,
            ItemCodeSAP: row.Item_x0020_Code_x0020_SAP,
            ItemName: row.Item_x0020_Name,
            Sales_x002f_FOC: row.Sales_x005c_FOC,
            SalesType: row.Sales_x0020_Type,
            BusinessSegment: row.Business_x0020_Segment,
            CustomerCodeSAP: row.Customer_x0020_Code_x0020_SAP,
            CustomerName: row.Customer_x0020_Name,
            ECSalesPrice: row.EC_x0020_Sales_x0020_Price,
            HQSTDCost: row.HQ_x0020_STD_x0020_Cost,
            TransferPrice: row.Transfer_x0020_Price,
            LocalizationCost: row.Localization_x0020_Cost,
            LocalCost: row.Local_x0020_Cost,
            GM_x0025_: row.GM_x0020__x0025_,
            SharePoint: row.SharePoint,
            Jan_x002d_21Qty: row.Jan_x002d_20_x0020_Qty,
            Jan_x002d_21USD: row.Jan_x002d_20_x0020_USD,
            Feb_x002d_21Qty: row.Feb_x002d_20_x0020_Qty,
            Feb_x002d_21USD: row.Feb_x002d_20_x0020_USD,
            Mar_x002d_21Qty: row.Mar_x002d_20_x0020_Qty,
            Mar_x002d_21USD: row.Mar_x002d_20_x0020_USD,
            Apr_x002d_21Qty: row.Apr_x002d_20_x0020_Qty,
            Apr_x002d_21USD: row.Apr_x002d_20_x0020_USD,
            May_x002d_21Qty: row.May_x002d_20_x0020_Qty,
            May_x002d_21USD: row.May_x002d_20_x0020_USD,
            Jun_x002d_21Qty: row.Jun_x002d_20_x0020_Qty,
            Jun_x002d_21USD: row.Jun_x002d_20_x0020_USD,
            Jul_x002d_21Qty: row.Jul_x002d_20_x0020_Qty,
            Jul_x002d_21USD: row.Jul_x002d_20_x0020_USD,
            Aug_x002d_21Qty: row.Aug_x002d_20_x0020_Qty,
            Aug_x002d_21USD: row.Aug_x002d_20_x0020_USD,
            Sep_x002d_21Qty: row.Sep_x002d_20_x0020_Qty,
            Sep_x002d_21USD: row.Sep_x002d_20_x0020_USD,
            Oct_x002d_21Qty: row.Oct_x002d_20_x0020_Qty,
            Oct_x002d_21USD: row.Oct_x002d_20_x0020_USD,
            Nov_x002d_21Qty: row.Nov_x002d_20_x0020_Qty,
            Nov_x002d_20USD: row.Nov_x002d_20_x0020_USD,
            Dec_x002d_21Qty: row.Dec_x002d_20_x0020_Qty,
            Dec_x002d_21USD: row.Dec_x002d_20_x0020_USD,
            AnnualSales: row.Annual_x0020_Sales,
            AnnualQTY: row.Annual_x0020_QTY,
            // Users: row.Users

            // mz7b: row.Customer_x0020_Code_x0020_SAP,
            // mc4l: row.Customer_x0020_Name,
            // EC_x0020_Sales_x0020_Price: row.EC_x0020_Sales_x0020_Price,
            // d4yd: row.HQ_x0020_STD_x0020_Cost,
            // Transfer_x0020_Price: row.Transfer_x0020_Price,
            // Localization_x0020_Cost: row.Localization_x0020_Cost,
            // Local_x0020_Cost: row.Local_x0020_Cost,
            // fg8r: row.GM_x0020__x0025_,

            // Item_x0020_Code_x0020_SAP: row.Item_x0020_Code_x0020_SAP,
            // Item_x0020_Name: row.Item_x0020_Name
          }).then((result: any) => {
            resolve(result);
          });
        })


      } else {
        reject('Failed adding list item...');
      }
    });
  }

  // public update(listName: string, itemId: any, item: any) {
  //   return new Promise((resolve, reject) => {
  //     if (sp !== null && sp !== undefined) {
  //       const list = sp.web.lists.getByTitle(listName);
  //       list.items.getById(itemId).update(item).then((result: any) => {
  //         console.log('updated')
  //         console.log(result);
  //         resolve(result);
  //       });
  //
  //     } else {
  //       reject('Failed updating list data...');
  //     }
  //   });
  // }
  //
  // public delete(listName: string, itemId: any) {
  //   return new Promise((resolve, reject) => {
  //     if (sp !== null && sp !== undefined) {
  //       const list = sp.web.lists.getByTitle(listName);
  //       list.items.getById(itemId).delete().then((result: any) => {
  //         resolve(result);
  //       });
  //
  //     } else {
  //       reject('Failed deleting list data...');
  //     }
  //   });
  // }


}
