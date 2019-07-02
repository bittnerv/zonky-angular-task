import { Observable } from 'rxjs';
import { Loan } from './loan';
import { Query, Requester } from 'src/app/common/requester';
import { batchload } from 'src/app/common/batchload';
import { ZonkyApiConfig } from 'src/app/common/zonky-api-config';
import { LoansService } from './loans-service';

const zonkyApi = {
  GetLoans: {
    method: 'GET',
    path: '/loans/marketplace'
  }
};

export class LoansServiceImpl implements LoansService {
  constructor(private requester: Requester, private zonkyApiConfig: ZonkyApiConfig) {
  }

  public getLoansByRating(rating: string): Observable<Array<Loan>> {
    const query: Query = {
      rating__eq: rating,
      fields: 'amount,rating'
    };

    return this.fetchLoans(query);
  }

  private fetchLoans(query: Query): Observable<Array<Loan>> {
    return batchload((page) => this.fetchLoansBatch(query, page), this.zonkyApiConfig.pageSize);
  }

  private fetchLoansBatch(query: Query, page: number): Observable<Array<Loan>> {
    const route = zonkyApi.GetLoans;
    const headers = this.buildPaginationHeaders(page);

    return this.requester.sendRequest<Array<Loan>>(
      route.method,
      `${this.zonkyApiConfig.baseUrl}${route.path}`,
      { headers, query }
    );
  }

  private buildPaginationHeaders(page: number) {
    return {
      'X-Page': page.toString(),
      'X-Size': this.zonkyApiConfig.pageSize.toString()
    };
  }
}

