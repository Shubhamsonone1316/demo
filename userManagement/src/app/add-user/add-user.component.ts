import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

import { PageEvent } from '@angular/material/paginator';

interface User {
  id: any;
  name: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  uppUserForm : FormGroup;
  isEditMode = false;
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role','actions'];
  
  pageSize = 10;
  pageIndex = 0;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // id:['']
    });

    this.uppUserForm = this.fb.group({
    
       id:['']
    });
  }

  ngOnInit(): void {

    this.users = this.userService.getUsers();  
    this.filteredUsers = [...this.users];
    
  }

  

  onSubmit(): void {
    if (this.addUserForm.valid) {
      console.log('user added',this.addUserForm.value);
       
      this.userService.addUser(this.addUserForm.value);
      this.addUserForm.reset();
      
     
      
    }

  }
  update(){
    if (this.addUserForm.valid) 
      console.log('updating user data', this.addUserForm.value);
      
      const updatedUser = this.addUserForm.value;
      const id = this.uppUserForm.value.id;
      
      const key = `user_${id}`;
      localStorage.setItem(key, JSON.stringify(updatedUser)); 
      this.isEditMode = false; 
      this.addUserForm.reset(); 
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
      this.isEditMode = true;
      console.log('Editing user:', id);

      const key = `user_${id}`;
      
      console.log('data edit data',key);

      const userData = localStorage.getItem(key);

  if (userData) {
    const user = JSON.parse(userData);
    console.log(`User with ID ${id} found in localStorage.`);

    
    this.addUserForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      role:user.role
    });

    this.uppUserForm.patchValue({
      id: user.id,
     
    });
  } else {
    console.log(`User with ID ${id} does not exist in localStorage.`);
  }
     
    }
    deleteUser(id: string) {
      console.log('Deleting user:', id);
      const key = `user_${id}`;
      

      console.log(`User with ID ${key} found in localStorage.`);

     
      if (localStorage.getItem(key)) {
          console.log(`User with ID ${id} found in localStorage.`);
          
          
          localStorage.removeItem(key);
          console.log(`User with ID ${id} has been deleted from localStorage.`);
      } else {
          console.log(`User with ID ${id} does not exist in localStorage.`);
      }
    }
}
