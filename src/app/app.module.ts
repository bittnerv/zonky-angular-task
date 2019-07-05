import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule, MatCardModule, MatToolbarModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AverageLoanByRatingComponent } from './average-loan-by-rating/average-loan-by-rating.component';
import { RatingsService, StaticRatingsService } from './domain/ratings';
import { LoansService, LoansServiceImpl, LoansCalculatorService } from './domain/loans';
import { Requester } from './common/requester';
import { ZonkyApiConfig } from './common/zonky-api-config';

import { environment } from '../environments/environment';

const materialModules = [
  MatButtonToggleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatToolbarModule
];

export function zonkyApiConfigFactory(): ZonkyApiConfig {
  return {
    baseUrl: environment.zonkyApiUrl,
    pageSize: environment.pageSize
  };
}

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
    Requester,
    { provide: ZonkyApiConfig, useFactory: zonkyApiConfigFactory},
    { provide: RatingsService, useClass: StaticRatingsService },
    { provide: LoansService, useClass: LoansServiceImpl },
    LoansCalculatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
