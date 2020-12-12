import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Headers, Query, Requester } from '../../common/requester';
import { batchload } from '../../common/batchload';
import { ZonkyApiConfig } from '../../common/zonky-api-config';

import { Loan } from './loan';
import { LoansService } from './loans-service';

export const zonkyHeaders = {
  page: 'X-Page',
  size: 'X-Size',
};

export const equal = (key: string): string => `${key}__eq`;

const zonkyApi = {
  getLoans: {
    method: 'GET',
    path: '/loans/marketplace'
  }
};

@Injectable()
export class LoansServiceImpl implements LoansService {
  constructor(private requester: Requester, private zonkyApiConfig: ZonkyApiConfig) {
  }

  public getLoansByRating(rating: string): Observable<Array<Loan>> {
    const query: Query = {
      [equal('rating')]: rating,
      fields: 'amount,rating'
    };

    return this.fetchLoans(query);
  }

  private fetchLoans(query: Query): Observable<Array<Loan>> {
    return batchload(
      page => this.fetchLoansBatch(query, page),
      this.zonkyApiConfig.pageSize,
    );
  }

  private fetchLoansBatch(query: Query, page: number): Observable<Array<Loan>> {
    const route = zonkyApi.getLoans;
    const headers = this.buildPaginationHeaders(page);

    return this.requester.sendRequest<Array<Loan>>(
      route.method,
      `${this.zonkyApiConfig.baseUrl}${route.path}`,
      { headers, query }
    );
  }

  private buildPaginationHeaders(page: number): Headers {
    return {
      [zonkyHeaders.page]: page.toString(),
      [zonkyHeaders.size]: this.zonkyApiConfig.pageSize.toString()
    };
  }
}

