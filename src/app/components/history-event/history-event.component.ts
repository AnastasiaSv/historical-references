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

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.historyEvent?.video) {
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.historyEvent?.video);
    }
  }
}
