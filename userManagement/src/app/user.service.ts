import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  // getUsers() {
  //   const users = localStorage.getItem('users');
  //   return users ? JSON.parse(users) : [];  // Handle null case with fallback to empty array
  // }

  // Method to add a user
  addUser(user: { name: string; email: string; role: string }) {
  
    const users = this.getUsers();
    
    const newId = users.length > 0 ? Math.max(...users.map(u => parseInt(u.id))) + 1 : 1;
    
    // Create the new user object with the generated ID
    const newUser = { id: newId.toString(), ...user };
    
    // Log the new user and ID
    console.log(`Adding new user with ID: ${newUser.id}`, newUser);
    
    // Store the new user in localStorage
    localStorage.setItem(`user_${newId}`, JSON.stringify(newUser));
    
    // Optionally, log the current users in localStorage to verify
    console.log('Current users in localStorage:', Object.keys(localStorage).filter(key => key.startsWith('user_')));
  }
  
  
 
  getUsers() {
    const users = [];
    console.log('Starting to retrieve users from localStorage...');
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      // Check if the key starts with 'user_' and log it
      if (key && key.startsWith('user_')) {
        console.log(`Found user key: ${key}`);
        
        const user = localStorage.getItem(key);
        if (user) {
          const parsedUser = JSON.parse(user);
          users.push(parsedUser);
          console.log(`User added:`, parsedUser);
        }
      }
    }
    
    console.log(`Total users retrieved: ${users.length}`);
    return users;
  }
  
  

  
}
