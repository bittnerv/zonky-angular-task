import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Query {
  [key: string]: string | Array<string>;
}

export interface RequestData {
  query?: Query;
  body?: any;
  headers?: {[key: string]: string};
}

@Injectable()
export class Requester {
  constructor(private httpClient: HttpClient) {
  }

  public sendRequest<T>(method: string, url: string, data: RequestData = {}): Observable<T> {
    return this.httpClient.request<T>(method, url, {
      params: new HttpParams({fromObject: data.query || {}}),
      body: data.body,
      headers: new HttpHeaders(data.headers || {})
    });
  }
}
