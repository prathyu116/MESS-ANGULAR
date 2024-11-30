import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = []; // Array to store user data
  newUser: any = { name: '', contact: '' }; // Object for the form

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadUsers(); // Load users on component initialization
  }

  // Method to load users from the backend
  loadUsers() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Add or update user
  addOrUpdateUser() {
    if (this.newUser.id) {
      // Update user
      this.dataService.updateUser(this.newUser.id, this.newUser).subscribe(() => {
        this.loadUsers(); // Reload the user list
        this.resetForm(); // Reset the form
      });
    } else {
      // Add new user
      this.dataService.addUser(this.newUser).subscribe(() => {
        this.loadUsers(); // Reload the user list
        this.resetForm(); // Reset the form
      });
    }
  }

  // Edit user
  editUser(user: any) {
    this.newUser = { ...user }; // Clone the user object into newUser
  }

  // Delete user
  deleteUser(id: number) {
    this.dataService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Reload the user list
    });
  }

  // Reset the form
  resetForm() {
    this.newUser = { name: '', contact: '' }; // Clear the form fields
  }
}
