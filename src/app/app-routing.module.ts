import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AverageLoanByRatingComponent } from './average-loan-by-rating/average-loan-by-rating.component';

const routeNames = {
  averageLoan: 'average-loan'
};

const routes: Routes = [
  {
    path: routeNames.averageLoan,
    component: AverageLoanByRatingComponent
  },
  { path: '**', redirectTo: routeNames.averageLoan }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
