import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Rating } from './rating';
import { RatingsService } from './ratings-service';

const ratings: Array<Rating> = [
  {
    value: 'AAAAAA',
    percentage: 2.99
  },
  {
    value: 'AAAAA',
    percentage: 3.99
  },
  {
    value: 'AAAA',
    percentage: 4.99
  },
  {
    value: 'AAA',
    percentage: 5.99
  },
  {
    value: 'AAE',
    percentage: 6.99
  },
  {
    value: 'AA',
    percentage: 8.49
  },
  {
    value: 'AE',
    percentage: 9.49
  },
  {
    value: 'A',
    percentage: 10.99
  },
  {
    value: 'B',
    percentage: 13.49
  },
  {
    value: 'C',
    percentage: 15.49
  },
  {
    value: 'D',
    percentage: 19.99
  }
];

export class StaticRatingsService implements RatingsService {
  private ratings = of(ratings).pipe(shareReplay(1));

  public getAvailableRatings(): Observable<Array<Rating>> {
    return this.ratings;
  }
}
