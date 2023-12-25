import { Component } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { HistoryEventsIdsService } from './services/history-events-ids.service';
import { HistoryEventsService } from './services/history-events.service';
import { IHistoryEventsState } from './models/history-events-state';
import { IHistoryEventsIdsState } from './models/history-events-ids-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  historyEventsIds$: Observable<IHistoryEventsIdsState> = this.historyEventsIdsService.historyEventsIds$;
  historyEvents$: Observable<IHistoryEventsState> = this.historyEventsIds$.pipe(
    switchMap(({ value }) => value?.length ? this.historyEventsService.getHistoryEventsByIds$(value) : of({ isLoading:false }))
  );

  constructor(
    private historyEventsIdsService: HistoryEventsIdsService,
    private historyEventsService: HistoryEventsService
  ) {}
}
