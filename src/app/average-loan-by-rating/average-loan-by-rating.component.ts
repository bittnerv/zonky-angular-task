import { Component, OnInit } from '@angular/core';

import { RatingsService, Rating } from '../domain/ratings';
import { LoansCalculatorService } from '../domain/loans';

@Component({
  selector: 'app-average-loan-by-rating',
  templateUrl: './average-loan-by-rating.component.html',
  styleUrls: ['./average-loan-by-rating.component.scss']
})
export class AverageLoanByRatingComponent implements OnInit {
  public ratings: Array<Rating>;
  public averageLoan: number;
  public isComputing = false;

  constructor(
    private ratingsService: RatingsService,
    private loansCalculatorService: LoansCalculatorService
  ) {
  }

  public ngOnInit(): void {
    this.ratingsService.getAvailableRatings()
      .subscribe(ratings => {
        this.ratings = ratings;
      });
  }

  public onRatingSelect(rating: string): void {
    this.isComputing = true;
    this.loansCalculatorService.getAverageLoanByRating(rating)
      .subscribe(averageLoan => {
        this.isComputing = false;
        this.averageLoan = averageLoan;
      });
  }
}
