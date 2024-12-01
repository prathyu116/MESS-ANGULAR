import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-expense-management',
  templateUrl: './expense-management.component.html',
  styleUrls: ['./expense-management.component.css'],
})
export class ExpenseManagementComponent implements OnInit {
  expenses: any[] = []; // List of expenses
  newExpense: any = { date: '', amount: 0 }; // Model for the form
  totalExpenses: number = 0; // Total expenses for the month

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getExpenses();
  }

  // Fetch all expenses
  getExpenses() {
    this.dataService.getExpenses().subscribe((data) => {
      this.expenses = data;
      this.calculateTotalExpenses();
    });
  }

  // Add a new expense
  addExpense() {
    if (!this.newExpense.date || !this.newExpense.amount) return;

    this.dataService.addExpense(this.newExpense).subscribe((expense) => {
      this.expenses.push(expense); // Add to the local array
      this.calculateTotalExpenses();
      this.newExpense = { date: '', amount: 0 }; // Reset the form
    });
  }

  // Delete an expense
  deleteExpense(expenseId: number) {
    this.dataService.deleteExpense(expenseId).subscribe(() => {
      this.expenses = this.expenses.filter((expense) => expense.id !== expenseId);
      this.calculateTotalExpenses();
    });
  }

  // Calculate total expenses
  calculateTotalExpenses() {
    this.totalExpenses = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }
}
