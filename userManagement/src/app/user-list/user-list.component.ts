import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { PageEvent } from '@angular/material/paginator';
interface User {
  id: any;
  name: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role','actions'];
  
  pageSize = 10;
  pageIndex = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();  // Fix here: Use getUsers() method
    this.filteredUsers = [...this.users];
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(filterValue) ||
      user.email.toLowerCase().includes(filterValue) ||
      user.role.toLowerCase().includes(filterValue)
    );
    this.pageIndex = 0;  // Reset page index when filter changes
  }
  onPaginateChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  getPagedData(): any[] {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredUsers.slice(start, end);
  }
  editUser(id: any) {
    console.log('Editing user:', id);
    // Implement your logic for editing (e.g., open a dialog or navigate to an edit page)
  }
  deleteUser(id: string) {
    console.log('Deleting user:', id);
    const key = `user_${id}`;
    
    // Check if the user exists in localStorage
    if (localStorage.getItem(key)) {
        console.log(`User with ID ${id} found in localStorage.`);
        
        // Remove the user data from localStorage using the user key
        localStorage.removeItem(key);
        console.log(`User with ID ${id} has been deleted from localStorage.`);
    } else {
        console.log(`User with ID ${id} does not exist in localStorage.`);
    }
  }
  
}
