import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { Loan } from './loan';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { mergeMap, reduce } from 'rxjs/operators';

export abstract class LoansService {
  public abstract getLoansByRating(rating: string): Observable<Array<Loan>>;
}

export class LoansServiceImplementation implements LoansService {
  private requester: ApiRequester;
  private batchSize = 200;

  constructor(private httpClient: HttpClient) {
    this.requester = new ApiRequester(httpClient, 'https://api.zonky.cz');
  }

  public getLoansByRating(rating: string): Observable<Array<Loan>> {
    const query = {
      rating__eq: rating,
      fields: 'amount,rating'
    };

    return this.fetchAllLoans(query);
  }

  private fetchAllLoans(query: Query): Observable<Array<Loan>> {
    let page = 0;
    const pageObservable = new BehaviorSubject(page);

    return pageObservable
      .pipe(
        mergeMap(() => this.fetchLoans(query, page)),
        mergeMap((loans) => {
          if (loans.length < this.batchSize) {
            pageObservable.complete();
          } else {
            page++;
            pageObservable.next(page);
          }

          return of(loans);
        }),
        reduce(
          (result, loans) => {
            result.push(...loans);

            return result;
          }
        )
      );
  }

  private fetchLoans(query: Query, page: number) {
    const headers = {
      'X-Page': page.toString(),
      'X-Size': this.batchSize.toString()
    };

    return this.requester.sendRequest<Array<Loan>>('GET', '/loans/marketplace', { headers, query });
  }
}

export type Query = {[key: string]: string | Array<string>};

export interface ApiRequestData {
  query?: Query;
  body?: any;
  headers?: {[key: string]: string};
}

export class ApiRequester {
  constructor(private httpClient: HttpClient, private baseUrl: string) {
  }

  public sendRequest<T>(method, path, data: ApiRequestData = {}): Observable<T> {
    return this.httpClient.request<T>(method, `${this.baseUrl}${path}`, {
      params: new HttpParams({fromObject: data.query || {}}),
      body: data.body,
      headers: new HttpHeaders(data.headers || {})
    });
  }
}
