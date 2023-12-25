import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { HistoryEventsIdsService } from 'src/app/services/history-events-ids.service';
import { HttpService } from 'src/app/services/http.service';
import { IDataTip } from 'src/app/models/data-tip';

@Component({
  selector: 'address-panel',
  templateUrl: './address-panel.component.html'
})
export class AddressPanelComponent implements OnInit, OnDestroy {

  addressControl = new FormControl();
  openDropdown: boolean = false;
  initialAddress: string = 'г Москва, Лаврушинский пер, д 10';

  tipsSubject: BehaviorSubject<IDataTip[]> = new BehaviorSubject<IDataTip[]>([]);
  destroySubject: Subject<void> = new Subject();

  get tips$() {
    return this.tipsSubject.asObservable();
  }

  constructor(
    private elementRef: ElementRef,
    private httpService: HttpService,
    private historyEventsIdsService: HistoryEventsIdsService
  ) {}

  @HostListener('document:click', ['$event'])
  onOutsidePanelClick($event: MouseEvent) {
    if (this.openDropdown && !this.elementRef.nativeElement.contains($event.target)) {
      this.openDropdown = false;
    }
  }

  ngOnInit(): void {
    this.getInitialResult();

    this.addressControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(address => this.httpService.getTips$(address)),
      takeUntil(this.destroySubject)
    ).subscribe(tips => {
      this.tipsSubject.next(tips || []);
      this.openDropdown = true;
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  getEventsIds(tip: IDataTip): void {
    const address = tip.value;
    const addressFiasId = tip.data['fias_id'];

    this.addressControl.patchValue(address, { emitEvent: false });
    this.openDropdown = false;

    if (addressFiasId) {
      this.historyEventsIdsService.getHistoryEventsIds(addressFiasId);
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
  
    if (this.isBottom(target)) {
      const tips = this.tipsSubject.getValue();

      this.httpService.getTips$(this.addressControl.value, 3)
        .pipe(takeUntil(this.destroySubject))
        .subscribe(newTips => this.tipsSubject.next([...tips, ...newTips]));
    }
  }

  private isBottom(element: HTMLElement): boolean {
    return element.offsetHeight + element.scrollTop >= element.scrollHeight - 1;
  }

  private getInitialResult(): void {
    this.httpService.getTips$(this.initialAddress)
      .pipe(takeUntil(this.destroySubject))
      .subscribe(tips => this.getEventsIds(tips[0]))
  }
}
