import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HistoryEventsComponent } from './components/history-events/history-events.component';
import { HistoryEventComponent } from './components/history-event/history-event.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddressPanelComponent } from './components/address-panel/address-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryEventsComponent,
    HistoryEventComponent,
    SpinnerComponent,
    AddressPanelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
