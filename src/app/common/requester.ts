import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Query {
  [key: string]: string | Array<string>;
}
export interface Headers {
  [key: string]: string;
}

export interface RequestData {
  query?: Query;
  body?: any;
  headers?: Headers;
}

@Injectable()
export class Requester {
  private defaultQuery: Query =  {};
  private defaultHeaders: Headers = {};

  constructor(private httpClient: HttpClient) {
  }

  public sendRequest<T>(method: string, url: string, data: RequestData = {}): Observable<T> {
    return this.httpClient.request<T>(method, url, {
      params: new HttpParams({fromObject: data.query || this.defaultQuery}),
      body: data.body,
      headers: new HttpHeaders(data.headers || this.defaultHeaders)
    });
  }
}
