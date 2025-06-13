import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from "../shared/components/input.component";
import { ModalComponent } from '../shared/components/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-zero-hero';
  
  onModalOpen() {
    console.log('Modal opened');
  }
  
  onModalClose() {
    console.log('Modal closed');
  }
}
