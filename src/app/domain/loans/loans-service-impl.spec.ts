import { LoansService } from './loans-service';
import { LoansServiceImpl } from './loans-service-impl';
import { Loan } from './loan';
import { of } from 'rxjs';

export const mockLoans: Array<Loan> = [
  { amount: 1000, rating: 'AAAA' },
  { amount: 1990, rating: 'AAAA' },
  { amount: 2290, rating: 'AAAA' },
  { amount: 1500, rating: 'AAAA' },
  { amount: 1600, rating: 'AAAA' },
  { amount: 3600, rating: 'AAAA' },
];

describe('LoansServiceImpl', () => {
  const zonkyApiUrl = 'zonky-api';
  const pageSize = 4;
  let loansService: LoansService;
  let sendRequest: jasmine.Spy;

  beforeEach(initializeService);

  describe('when asked for loans by rating', () => {
    const rating = 'test';
    let loans: Array<Loan>;

    describe('and there are no loans for rating', () => {
      beforeEach(() => simulateLoans(0));

      it('should return empty array', async () => {
        expect(await getLoansByRating()).toEqual([]);
      });

      it('should send one request', async () => {
        await getLoansByRating();
        expectToRequestLoansByRatingOnce(rating);
      });
    });

    describe('and there are less then one page of loans', () => {
      beforeEach(() => simulateLoans(2));

      it('should return array', async () => {
        expect(await getLoansByRating()).toEqual(loans);
      });

      it('should send one request', async () => {
        await getLoansByRating();
        expectToRequestLoansByRatingOnce(rating);
      });
    });

    describe('and there are one page of loans', () => {
      beforeEach(() => simulateLoans(pageSize));

      it('should return array', async () => {
        expect(await getLoansByRating()).toEqual(loans);
      });

      it('should send two requests', async () => {
        await getLoansByRating();
        expectToRequestLoansByRatingTwice(rating);
      });
    });

    describe('and there are more than one page of loans', () => {
      beforeEach(() => simulateLoans(pageSize + 2));

      it('should return array', async () => {
        expect(await getLoansByRating()).toEqual(loans);
      });

      it('should send two requests', async () => {
        await getLoansByRating();
        expectToRequestLoansByRatingTwice(rating);
      });
    });

    function simulateLoans(count: number) {
      loans = mockLoans.slice(0, count);
      simulateLoansResponses(loans);
    }

    function getLoansByRating(): Promise<Array<Loan>> {
      return loansService.getLoansByRating(rating).toPromise();
    }
  });

  function expectToRequestLoansByRating(rating: string, page: number) {
    const headers = {
      'X-Page': page.toString(),
      'X-Size': pageSize.toString()
    };
    const query = {
      rating__eq: rating,
      fields: 'amount,rating'
    };

    expect(sendRequest).toHaveBeenCalledWith(
      'GET',
      `${zonkyApiUrl}/loans/marketplace`,
      { headers, query }
    );
  }

  function expectToRequestLoansByRatingOnce(rating: string) {
    expect(sendRequest).toHaveBeenCalledTimes(1);
    expectToRequestLoansByRating(rating, 0);
  }

  function expectToRequestLoansByRatingTwice(rating: string) {
    expect(sendRequest).toHaveBeenCalledTimes(2);
    expectToRequestLoansByRating(rating, 0);
    expectToRequestLoansByRating(rating, 1);
  }

  function simulateLoansResponses(loans: Array<Loan>) {
    sendRequest = sendRequest.and.callFake((method, url, data) => {
      const pageIndex = Number.parseInt(data.headers['X-Page'], 10);
      const pageStart = pageSize * pageIndex;

      return of(loans.slice(pageStart, pageStart + pageSize));
    });
  }

  function initializeService() {
    const requester = { sendRequest: jasmine.createSpy('sendRequest') } as any;

    sendRequest = requester.sendRequest;
    loansService = new LoansServiceImpl(requester, { baseUrl: zonkyApiUrl, pageSize });
  }
});
