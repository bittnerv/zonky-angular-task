import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AverageLoanByRatingComponent } from './average-loan-by-rating/average-loan-by-rating.component';
import { RatingsService, StaticRatingsService } from './domain/ratings';
import { LoansService, LoansServiceImpl, LoansCalculatorService } from './domain/loans';
import { Requester } from './common/requester';
import { ZonkyApiConfig } from './common/zonky-api-config';

const materialModules = [
  MatButtonToggleModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatToolbarModule
];

function zonkyApiConfigFactory(): ZonkyApiConfig {
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
