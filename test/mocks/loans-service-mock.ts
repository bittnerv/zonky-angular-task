import { LoansService, Loan } from 'src/app/domain/loans';
import { of, Observable } from 'rxjs';

export class LoansServiceMock extends LoansService {
  constructor(public loans: Array<Loan>) {
    super();
  }

  public getLoansByRating(rating: string): Observable<Array<Loan>> {
    const matchRating = (loan: Loan) => loan.rating === rating;

    return of(this.loans.filter(matchRating));
  }
}
