import { Observable } from 'rxjs';
import { Loan } from './loan';

export abstract class LoansService {
  public abstract getLoansByRating(rating: string): Observable<Array<Loan>>;
}
