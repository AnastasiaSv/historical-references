import { Injectable } from "@angular/core";
import { delay, from, map, Observable, of, startWith, switchMap, toArray } from "rxjs";
import { IHistoryEvent } from "../models/history-event";
import { IHistoryEventsState } from "../models/history-events-state";

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
        title: 'Event 1',
        description: 'Как принято считать, тщательные исследования конкурентов, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут ограничены исключительно образом мышления. Имеется спорная точка зрения, гласящая примерно следующее: представители современных социальных резервов представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть объединены в целые кластеры себе подобных. С другой стороны, сплочённость команды профессионалов в значительной степени обусловливает важность позиций, занимаемых участниками в отношении поставленных задач.',
        image: 'img1.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 2,
        address: 'г Москва, Лаврушинский пер, д 10',
        date: '25.10.2021',
        title: 'Event 2',
        description: 'Значимость этих проблем настолько очевидна, что экономическая повестка сегодняшнего дня создаёт предпосылки для экономической целесообразности принимаемых решений. Есть над чем задуматься: акционеры крупнейших компаний представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть своевременно верифицированы. Также как высокое качество позиционных исследований однозначно определяет каждого участника как способного принимать собственные решения касаемо как самодостаточных, так и внешне зависимых концептуальных решений.',
        image: 'img2.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 3,
        address: 'г Москва, Лаврушинский пер, д 10',
        date: '26.10.2021',
        title: 'Event 3',
        description: 'Задача организации, в особенности же курс на социально-ориентированный национальный проект прекрасно подходит для реализации кластеризации усилий! Сложно сказать, почему непосредственные участники технического прогресса, превозмогая сложившуюся непростую экономическую ситуацию, обнародованы. Кстати, базовые сценарии поведения пользователей и по сей день остаются уделом либералов, которые жаждут быть описаны максимально подробно. Повседневная практика показывает, что разбавленное изрядной долей эмпатии, рациональное мышление требует анализа дальнейших направлений развития.',
        image: 'img3.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 4,
        address: 'г Москва 4',
        date: '21.20.2021',
        title: 'Event 4',
        description: 'Внезапно, интерактивные прототипы ограничены исключительно образом мышления. В своём стремлении улучшить пользовательский опыт мы упускаем, что элементы политического процесса набирают популярность среди определенных слоев населения, а значит, должны быть разоблачены. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: экономическая повестка сегодняшнего дня способствует подготовке и реализации вывода текущих активов. Картельные сговоры не допускают ситуации, при которой интерактивные прототипы, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут призваны к ответу.',
        image: 'img4.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 5,
        address: 'г Москва 5',
        date: '21.20.2021',
        title: 'Event 5',
        description: 'Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности требует анализа системы массового участия. В частности, существующая теория говорит о возможностях экспериментов, поражающих по своей масштабности и грандиозности.',
        image: 'img5.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 6,
        address: 'г Москва 6',
        date: '21.20.2021',
        title: 'Event 6',
        description: 'Не следует, однако, забывать, что реализация намеченных плановых заданий требует определения и уточнения поэтапного и последовательного развития общества. В своём стремлении повысить качество жизни, они забывают, что консультация с широким активом, в своём классическом представлении, допускает внедрение существующих финансовых и административных условий. Сложно сказать, почему акционеры крупнейших компаний указаны как претенденты на роль ключевых факторов!',
        image: 'img6.jpg',
        video: 'https://www.youtube.com/embed/JFGdXH-5If0'
      },
      {
        id: 7,
        address: 'г Москва 7',
        date: '21.20.2021',
        title: 'Event 7',
        description: 'Идейные соображения высшего порядка, а также курс на социально-ориентированный национальный проект требует определения и уточнения новых предложений. В целом, конечно, реализация намеченных плановых заданий не даёт нам иного выбора, кроме определения глубокомысленных рассуждений. Банальные, но неопровержимые выводы, а также явные признаки победы институционализации могут быть разоблачены. Кстати, явные признаки победы институционализации формируют глобальную экономическую сеть и при этом — смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.',
        image: 'img7.jpg',
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
      map(items => items.find(item => item.id === id))
    );
  }
}
