import { Loan } from './loan';
import { LoansCalculatorService } from './loans-calculator-service';
import { LoansServiceMock } from 'test/mocks/loans-service-mock';

export const mockLoans: Array<Loan> = [
  { amount: 1000, rating: 'AAAA' },
  { amount: 2000, rating: 'AAAA' }
];

describe('LoansCalculatorService', () => {
  let loansCalulatorService: LoansCalculatorService;
  let loansService: LoansServiceMock;

  beforeEach(initializeService);

  describe('when asked for average loan by rating', () => {
    it('should calculate loans', async () => {
      expect(await getAverageLoanByRating()).toEqual(1500);
    });

    describe('and there are no loans for rating', () => {
      it('should return 0', async () => {
        simulateNoLoans();
        expect(await getAverageLoanByRating()).toEqual(0);
      });
    });

    function simulateNoLoans() {
      loansService.loans = [];
    }

    async function getAverageLoanByRating() {
      return loansCalulatorService.getAverageLoanByRating('AAAA').toPromise();
    }
  });

  function initializeService() {
    loansService = new LoansServiceMock(mockLoans);
    loansCalulatorService = new LoansCalculatorService(loansService);
  }
});

