import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-meal-management',
  templateUrl: './meal-management.component.html',
  styleUrls: ['./meal-management.component.css'],
})
export class MealManagementComponent implements OnInit {
  meals: any[] = [];
  users: any[] = [];
  selectedMeal: any = { userId: '', date: '', meals: 0 };
  totalMealsByUser: any[] = []; // Array to store calculated totals
  selectedMonth: string = ''; // Holds the selected month (e.g., '2024-11')

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadMeals();
    this.loadUsers();
  }

  loadMeals() {
    this.dataService.getMeals().subscribe((data) => {
      this.meals = data;
    });
  }

  loadUsers() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addOrUpdateMeal() {
    if (this.selectedMeal.id) {
      this.dataService.updateMeal(this.selectedMeal.id, this.selectedMeal).subscribe(() => {
        this.loadMeals();
        this.resetForm();
      });
    } else {
      this.dataService.addMeal(this.selectedMeal).subscribe(() => {
        this.loadMeals();
        this.resetForm();
      });
    }
  }

  editMeal(meal: any) {
    this.selectedMeal = { ...meal };
  }

  deleteMeal(id: number) {
    this.dataService.deleteMeal(id).subscribe(() => {
      this.loadMeals();
    });
  }

  resetForm() {
    this.selectedMeal = { userId: '', date: '', meals: 0 };
  }

  // Calculate total meals consumed by each user for the selected month
  calculateTotalMeals() {
    if (!this.selectedMonth) return;

    const [year, month] = this.selectedMonth.split('-').map(Number);
    console.log("ddddddddddddddddd",this.meals)

    // Filter meals for the selected month and year
    const filteredMeals = this.meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      return mealDate.getFullYear() === year && mealDate.getMonth() + 1 === month;
    });
    console.log("filteredMeals", filteredMeals)
    // Calculate totals grouped by user
    // Calculate total meals for each user
    const totals = this.users.map((user) => {
      console.log("Current User:", user);

      //  Find meals for the current user
      const userMeals = filteredMeals.filter((meal) => {
        console.log("meal",meal)
        const isUserMeal = meal.userId === user.id;
        console.log(`Meal belongs to ${user.name}:`, isUserMeal);
        return isUserMeal;
      });
      console.log(`${user.name}'s Meals:`, userMeals);

      //  Sum up the meals for the user
      const totalMealsForUser = userMeals.reduce((sum, meal) => {
        console.log(`Adding ${meal.meals} meals to ${user.name}'s total.`);
        return sum + meal.meals;
      }, 0);

      return { name: user.name, totalMeals: totalMealsForUser };
    });

    console.log("Total Meals by User:", totals);

    // Step 4: Assign the calculated totals to a variable
    this.totalMealsByUser = totals;
  }
}
