import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, Observable, of, take } from "rxjs";
import { IHistoryEventsIdsState } from "../models/history-events-ids-state";
import { IHistoryEventsIds } from "../models/history-events-ids";

@Injectable({
  providedIn: 'root'
})
export class HistoryEventsIdsService {

  private historyEventsIdsSubject: BehaviorSubject<IHistoryEventsIdsState> = new BehaviorSubject<IHistoryEventsIdsState>({ isLoading: false });

  get historyEventsIds$(): Observable<IHistoryEventsIdsState> {
    return this.historyEventsIdsSubject.asObservable();
  }

  getHistoryEventsIds$(): Observable<IHistoryEventsIds[]> {
    const historyEventsIds: IHistoryEventsIds[] = [
      {
        fiasId: '715b2539-cae2-4e4a-a96e-66e2ef06997e',
        historyEventsIds: [ 1, 2, 3 ]
      },
      {
        fiasId: '245074e7-402a-424e-95b2-5dacd0e7dcb3',
        historyEventsIds: [ 2, 3 ]
      },
      {
        fiasId: '84b63f7c-f528-43ac-9120-cc3d37014c13',
        historyEventsIds: [ 1 ]
      },
      {
        fiasId: '5481086a-8da5-4c66-8db0-4eb1e6872794',
        historyEventsIds: [ 68, 70 ]
      }
    ];

    return of(historyEventsIds);
  }

  getHistoryEventsIds(fiasId: string): void {
    this.historyEventsIdsSubject.next({ isLoading: true });
    this.getHistoryEventsIds$().pipe(
      delay(500),
      map(items => items.find(item => item.fiasId === fiasId)),
      take(1)
    ).subscribe(item => this.historyEventsIdsSubject.next({ isLoading: false, value: item?.historyEventsIds || [] }));
  }
}
