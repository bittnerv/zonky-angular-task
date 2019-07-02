import { LoansService, Loan } from 'src/app/domain/loans';
import { of, Observable } from 'rxjs';

export const loans: Array<Loan> = [
  { amount: 1000, rating: 'AAAA'},
  { amount: 1990, rating: 'AAAA'},
  { amount: 1500, rating: 'AAA'},
];

export class LoansServiceMock extends LoansService {
  public getLoansByRating(rating: string): Observable<Array<Loan>> {
    const matchRating = (loan) => loan.rating === rating;

    return of(loans.filter(matchRating));
  }
}
