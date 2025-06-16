import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  @Input() title = "";
  @Input() message = "";
  showModal = signal(false);

  closeModal=(event:MouseEvent)=>{
    if(event.target === event.currentTarget){
      this.showModal.set(false);
    }
  }
 
}
