import { Component, signal } from '@angular/core';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-home',
  imports: [Modal],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  showModal = signal(false);
   handleConfirm() {
    this.showModal.set(false);
  }
}
