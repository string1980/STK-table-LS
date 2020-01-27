import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HellopnpjsWebPartComponent } from './hellopnpjs-web-part/hellopnpjs-web-part.component';
import { PnPBaseService } from './services/pnpBase.service';
import { TestListService } from './services/testList.service';


@NgModule({
  declarations: [
    HellopnpjsWebPartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PnPBaseService,
    TestListService
  ],
  entryComponents: [HellopnpjsWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(HellopnpjsWebPartComponent, { injector: this.injector });
    customElements.define('app-hellopnpjs-web-part', el);
  }
}
