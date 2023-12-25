import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IDataResponse } from "../models/data-response";
import { map, Observable } from "rxjs";
import { IDataTip } from "../models/data-tip";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private apiKey = 'd227b5e89df91dc2ad3c508f9279d698739b6abb'

  constructor(private http: HttpClient) {}

  getTips$(query: string, count: number = 20): Observable<IDataTip[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${this.apiKey}`
      })
    };
    const body = { 
      query,
      count
    };

    return this.http.post<IDataResponse>(this.url, body, httpOptions).pipe(map(data => data.suggestions || []));
  }
}
