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
        fiasId: '84b63f7c-f528-43ac-9120-cc3d37014c13',
        historyEventsIds: [ 1, 2, 3 ]
      },
      {
        fiasId: '29251dcf-00a1-4e34-98d4-5c47484a36d4',
        historyEventsIds: [ 4 ]
      },
      {
        fiasId: '962d32bd-ee76-41e6-9710-920e5957d26a',
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
