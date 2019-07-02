import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Rating } from './rating';

export abstract class RatingsService {
  public abstract getAvailableRatings(): Observable<Array<Rating>>;
}

