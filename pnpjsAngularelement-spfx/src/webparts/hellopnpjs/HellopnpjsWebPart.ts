import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField
  } from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'HellopnpjsWebPartStrings';

import 'pnpjs-angularelement/dist/pnpjsAngularelement/bundle';

export interface IHellopnpjsWebPartProps {
  description: string;
}

export default class HellopnpjsWebPart extends BaseClientSideWebPart<IHellopnpjsWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `<app-hellopnpjs-web-part description="${ this.properties.description }"></app-hellopnpjs-web-part>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
