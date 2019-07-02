import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AverageLoanByRatingComponent } from './average-loan-by-rating/average-loan-by-rating.component';

const RouteNames = {
  averageLoan: 'average-loan'
};

const routes: Routes = [
  {
    path: RouteNames.averageLoan,
    component: AverageLoanByRatingComponent
  },
  { path: '**', redirectTo: RouteNames.averageLoan }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
