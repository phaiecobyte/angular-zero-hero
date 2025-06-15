import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { ConfirmDelete } from "../confirm-delete/confirm-delete";

@Component({
  selector: 'app-user',
  imports: [CommonModule, ConfirmDelete],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  name: string = '';
  showConfirmDeleteComponent: boolean = false;
  userToDelete: User | null = null;

  constructor(private userSerivice: UserService) {}
  
  ngOnInit(): void {
      this.users = this.userSerivice.users;
  }

  onDelete = (user: User) => {
    this.showConfirmDeleteComponent = true;
    this.name = user.getName();
    this.userToDelete = user;
  }
  
  handleConfirmResponse(confirmed: boolean) {
    if (confirmed && this.userToDelete) {
      // Delete the user
      // this.userSerivice.deleteUser(this.userToDelete.getId());
      console.log(`Deleting user: ${this.userToDelete.getName()}`);
      // Update the user list after deletion
      // this.users = this.userSerivice.users;
    }
    
    // Close the confirmation dialog
    this.showConfirmDeleteComponent = false;
    this.userToDelete = null;
  }
}
