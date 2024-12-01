import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  meals: any[] = [];
  users: any[] = [];
  expenses: any[] = [];
  selectedMonth: string = '';
  mealReport: any[] = []; // Stores meals per user
  totalExpenses: number = 0;
  totalMeals: number = 0;
  costPerMeal: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Load all required data
  loadData() {
    this.dataService.getMeals().subscribe((data) => {
      this.meals = data;
    });
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
    });
    this.dataService.getExpenses().subscribe((data) => {
      this.expenses = data;
    });
  }

  // Generate the report
  generateReport() {
    if (!this.selectedMonth) return;

    const [year, month] = this.selectedMonth.split('-').map(Number);

    // Filter meals by the selected month
    const filteredMeals = this.meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      return mealDate.getFullYear() === year && mealDate.getMonth() + 1 === month;
    });

    // Filter expenses by the selected month
    const filteredExpenses = this.expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === year && expenseDate.getMonth() + 1 === month;
    });

    // Calculate total meals for each user
    this.mealReport = this.users.map((user) => {
      const userMeals = filteredMeals
        .filter((meal) => meal.userId === user.id)
        .reduce((sum, meal) => sum + meal.meals, 0);

      return { name: user.name, totalMeals: userMeals };
    });

    // Calculate total expenses and total meals
    this.totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.totalMeals = filteredMeals.reduce((sum, meal) => sum + meal.meals, 0);

    // Calculate cost per meal
    this.costPerMeal = this.totalMeals > 0 ? this.totalExpenses / this.totalMeals : 0;
  }
}
