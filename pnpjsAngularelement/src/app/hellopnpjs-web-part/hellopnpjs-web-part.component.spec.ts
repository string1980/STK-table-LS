import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HellopnpjsWebPartComponent } from './hellopnpjs-web-part.component';

describe('HellopnpjsWebPartComponent', () => {
  let component: HellopnpjsWebPartComponent;
  let fixture: ComponentFixture<HellopnpjsWebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HellopnpjsWebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HellopnpjsWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
