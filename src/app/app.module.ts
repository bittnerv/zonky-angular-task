import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AverageLoanByRatingComponent } from './average-loan-by-rating/average-loan-by-rating.component';
import { RatingsService, StaticRatingsService } from './domain/ratings';
import { LoansService, LoansServiceImplementation, LoansCalculatorService } from './domain/loans';

const materialModules = [
  MatButtonToggleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    AppComponent,
    AverageLoanByRatingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ...materialModules
  ],
  providers: [
    { provide: RatingsService, useClass: StaticRatingsService },
    { provide: LoansService, useClass: LoansServiceImplementation },
    LoansCalculatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
