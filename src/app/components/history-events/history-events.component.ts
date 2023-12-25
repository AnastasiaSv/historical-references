import { Component, Input } from '@angular/core';
import { IHistoryEvent } from 'src/app/models/history-event';

@Component({
  selector: 'history-events',
  templateUrl: './history-events.component.html'
})
export class HistoryEventsComponent {

  @Input() historyEvents?: IHistoryEvent[];
}
