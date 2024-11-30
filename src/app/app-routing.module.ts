import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { MealManagementComponent } from './components/meal-management/meal-management.component';
import { ExpenseManagementComponent } from './components/expense-management/expense-management.component';
import { ReportingComponent } from './components/reporting/reporting.component';

const routes: Routes = [
  { path: 'users', component: UserManagementComponent },
  { path: 'meals', component: MealManagementComponent },
  { path: 'expenses', component: ExpenseManagementComponent },
  { path: 'reports', component: ReportingComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
