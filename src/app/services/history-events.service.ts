import { Injectable } from "@angular/core";
import { delay, from, map, Observable, of, startWith, switchMap, toArray } from "rxjs";
import { IHistoryEventsState } from "../models/history-events-state";
import { IHistoryEvent } from "../models/history-event";

@Injectable({
  providedIn: 'root'
})
export class HistoryEventsService {

  getHistoryEvents$(): Observable<IHistoryEvent[]> {
    const historyEvents: IHistoryEvent[] = [
      {
        id: 1,
        address: 'г Москва, Лаврушинский пер, д 10',
        date: '21.10.2021',
        title: 'Выставка картин "Другими глазами"',
        description: 'Живописные полотна великого русского художника Николая Константиновича Рериха — поистине драгоценный дар человечеству. На картинах Мастера предстаёт богатейший мир образов, наполненных глубокой философской мыслью и одухотворённых красотой: величественные храмы и царство Гималаев, герои старинных легенд и преданий, святые и подвижники Востока и Запада.',
        image: 'img1.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 2,
        address: 'г Москва, Лаврушинский пер, д 10',
        date: '25.10.2021',
        title: 'Выставка картин "Акценты"',
        description: 'Мир красоты, созданный Николаем Рерихом, на фоне общего состояния современного искусства кажется некой сказочной страной. Все там подано в другом измерении, увидено в иной, более широкой, космической перспективе, создано в неведомом нам духовном полете. В его мире властвует одна лишь форма и чувство цвета и линий, здесь нет отражения обычной жизни или состояний природы, того, что чаще всего преподносит нам современное искусство. Здесь налицо попытка запечатлеть жизнь в ее подлинном облике, как простор возвышенных устремлений и вдохновений, как высшую истину и единство, жизнь, устремленную к раскрытию смысла сущего, — то, что еще Аристотель выдвигал как высшую задачу и заповедь искусства. Форма здесь сияет, звенит благозвучием духа.',
        image: 'img2.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 3,
        address: 'г Москва, Лаврушинский пер, д 10',
        date: '26.10.2021',
        title: 'Выставка картин "Феномен времени"',
        description: 'Высшая Истина трудно вместима в чувственно воспринимаемые формы и образы изобразительного искусства. Поэтому художники духа неизменно прибегают к символам, знакам и притчам, к священному языку всех религий и искусств, который можно расшифровать и постичь независимо от знания существующих наречий. Такой язык высоких символов использует и Николай Рерих.',
        image: 'img3.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      }
    ];

    return of(historyEvents);
  }

  getHistoryEventsByIds$(ids: number[]): Observable<IHistoryEventsState> {
    return from(ids).pipe(
      delay(500),
      switchMap(id => this.getHistoryEventById$(id)),
      toArray(),
      map(arr => ({ isLoading: false, value: arr.filter(item => !!item) as IHistoryEvent[] })),
      startWith({ isLoading: true })
    );
  }

  private getHistoryEventById$(id: number): Observable<IHistoryEvent | undefined> {
    return this.getHistoryEvents$().pipe(
      map(events => events.find(event => event.id === id))
    );
  }
}
