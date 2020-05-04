import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AverageLoanByRatingComponent } from './average-loan-by-rating.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RatingsService, Rating } from '../domain/ratings';
import { RatingsServiceMock } from 'test/mocks/ratings-service-mock';
import { LoansCalculatorService } from '../domain/loans';
import { Subject } from 'rxjs/internal/Subject';

const ratings: Array<Rating> = [
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

describe('AverageLoanByRatingComponent', () => {
  const averageLoan = 1000;
  let fixture: ComponentFixture<AverageLoanByRatingComponent>;
  let component: AverageLoanByRatingComponent;
  let element: HTMLElement;
  let getAverageLoanByRating: jasmine.Spy;
  let averageLoanObservable: Subject<number>;

  beforeEach(async(initalizeTestModule));
  beforeEach(initializeComponent);

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should offer all ratings', () => {
    const ratingsToggles = findElements('rating-toggle');

    expect(ratingsToggles.length).toEqual(ratings.length);
    ratingsToggles.forEach((ratingToggle, index) => {
      expect(ratingToggle.textContent.trim()).toEqual(`${ratings[index].percentage} %`);
    });
  });

  it('should have no average loan set', () => {
    expect(component.averageLoan).toBeUndefined();
    expect(component.isComputing).toBe(false);
  });

  describe('when selected rating', () => {
    beforeEach(() => selectRating(1));

    it('should call loans calculator', () => {
      expect(getAverageLoanByRating).toHaveBeenCalledTimes(1);
      expect(getAverageLoanByRating).toHaveBeenCalledWith(ratings[1].value);
    });

    it('should set computing to true', () => {
      expect(component.isComputing).toBe(true);
    });

    describe('and average loan is computed', () => {
      beforeEach(computeAverageLoan);

      it('should set average loan', () => {
        expect(component.averageLoan).toEqual(averageLoan);
        expect(component.isComputing).toBe(false);
      });
    });

    function computeAverageLoan(): void {
      averageLoanObservable.next(averageLoan);
    }

    function selectRating(ratingIndex: number): void {
      const ratingsToggles = findElements('rating-toggle');

      ratingsToggles[ratingIndex].querySelector('button').click();
    }
  });

  function findElements(selector: string): Array<HTMLElement> {
    return Array.from(element.querySelectorAll(`[data-test=${selector}]`));
  }

  function initalizeTestModule(): void {
    averageLoanObservable = new Subject();
    getAverageLoanByRating = jasmine.createSpy('getAverageLoanByRating').and.returnValue(averageLoanObservable);

    TestBed.configureTestingModule({
      imports: [
        MatButtonToggleModule,
        MatCardModule,
        MatProgressSpinnerModule
      ],
      providers: [
        { provide: RatingsService, useValue: new RatingsServiceMock(ratings) },
        { provide: LoansCalculatorService, useValue: { getAverageLoanByRating } }
      ],
      declarations: [
        AverageLoanByRatingComponent
      ],
    }).compileComponents();
  }

  function initializeComponent(): void {
    fixture = TestBed.createComponent(AverageLoanByRatingComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  }
});
