import { Injectable } from "@angular/core";
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";

@Injectable()

export class PnPBaseService {

    constructor() {}

    public get(listName: string) {
      return new Promise((resolve, reject) => {
        if (sp !== null && sp !== undefined) {
          const items = sp.web.lists.getByTitle(listName).items.getAll();
          resolve(items);
        } else {
          reject('Failed getting list data...');
        }
      });
    }

    public getItemById(listName: string, itemId: any) {
      return new Promise((resolve, reject) => {
        if (sp !== null && sp !== undefined) {
          const item = sp.web.lists.getByTitle(listName).items.getById(itemId).get();
          resolve(item);
        } else {
          reject('Failed getting list data...');
        }
      });
    }

    public add(listName: string, item: any) {
      return new Promise((resolve, reject) => {
        if (sp !== null && sp !== undefined) {
          sp.web.lists.getByTitle(listName).items.add(item).then((result: any) => {
            resolve(result);
          });
        } else {
          reject('Failed adding list item...');
        }
      });
    }

    public update(listName: string, itemId: any, item: any) {
      return new Promise((resolve, reject) => {
        if (sp !== null && sp !== undefined) {
          const list = sp.web.lists.getByTitle(listName);
          list.items.getById(itemId).update(item).then((result: any) => {
            console.log('updated')
            console.log(result);
            resolve(result);
          });

        } else {
          reject('Failed updating list data...');
        }
      });
    }

    public delete(listName: string, itemId: any) {
      return new Promise((resolve, reject) => {
        if (sp !== null && sp !== undefined) {
          const list = sp.web.lists.getByTitle(listName);
          list.items.getById(itemId).delete().then((result: any) => {
            resolve(result);
          });

        } else {
          reject('Failed deleting list data...');
        }
      });
    }


}
