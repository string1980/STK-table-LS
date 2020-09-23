import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {HellopnpjsWebPartComponent} from './hellopnpjs-web-part/hellopnpjs-web-part.component';
import {PnPBaseService} from './services/pnpBase.service';
import {TestListService} from './services/testList.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {YesNoComponent} from './dialogs/yes-no/yes-no.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HellopnpjsWebPartComponent,
    YesNoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule

  ],
  providers: [PnPBaseService, TestListService],
  entryComponents: [HellopnpjsWebPartComponent, YesNoComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(HellopnpjsWebPartComponent, {injector: this.injector});
    customElements.define('app-hellopnpjs-web-part', el);
  }
}
