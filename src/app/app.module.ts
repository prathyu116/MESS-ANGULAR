import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { MealManagementComponent } from './components/meal-management/meal-management.component';
import { ExpenseManagementComponent } from './components/expense-management/expense-management.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { FormsModule } from '@angular/forms'; // Add this line
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    MealManagementComponent,
    ExpenseManagementComponent,
    ReportingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
