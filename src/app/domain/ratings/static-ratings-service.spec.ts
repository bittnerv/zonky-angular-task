import { RatingsService } from './ratings-service';
import { StaticRatingsService } from './static-ratings-service';
import { Rating } from './rating';

describe('StaticRatingsService', () => {
  let ratingsService: RatingsService;

  beforeEach(initializeService);

  describe('when asked for ratings', () => {
    let ratings: Array<Rating>;

    beforeEach(async () => {
      ratings = await getRatings();
    });

    it('should return 11 defined ratings', () => {
      expect(ratings.length).toEqual(11);
    });

    it('should always return same result', async () => {
      expect(await getRatings()).toEqual(ratings);
    });

    function getRatings(): Promise<Array<Rating>> {
      return ratingsService.getAvailableRatings().toPromise();
    }
  });

  function initializeService() {
    ratingsService = new StaticRatingsService();
  }
})
  ;
