import { Observable, of } from 'rxjs';
import { Rating, RatingsService } from 'src/app/domain/ratings';

export class RatingsServiceMock implements RatingsService {
  constructor(private ratings: Array<Rating>) {
  }

  public getAvailableRatings(): Observable<Array<Rating>> {
    return of(this.ratings);
  }
}
