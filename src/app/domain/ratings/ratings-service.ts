import { Observable } from 'rxjs';
import { Rating } from './rating';

export abstract class RatingsService {
  public abstract getAvailableRatings(): Observable<Array<Rating>>;
}

