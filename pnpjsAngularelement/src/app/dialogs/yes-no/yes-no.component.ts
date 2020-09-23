import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss']
})
export class YesNoComponent implements OnInit {
 @Output()onYesEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
 @Output()onNoEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  onYesHandler() {
    this.onYesEmitter.emit(false);
  }

  onNoHandler() {
    this.onYesEmitter.emit(false);
  }
}
