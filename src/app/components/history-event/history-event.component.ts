import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IHistoryEvent } from 'src/app/models/history-event';

@Component({
  selector: 'history-event',
  templateUrl: './history-event.component.html'
})
export class HistoryEventComponent implements OnInit {

  @Input() historyEvent!: IHistoryEvent;

  safeURL?: SafeResourceUrl;

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    if (this.historyEvent?.video) {
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.historyEvent?.video);
    }
  }
}
