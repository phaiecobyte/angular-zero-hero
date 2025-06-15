import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  imports: [],
  templateUrl: './confirm-delete.html',
  styleUrl: './confirm-delete.scss'
})
export class ConfirmDelete {
  @Input() object:string='';
  @Output() confirmEvent = new EventEmitter<boolean>();

  onConfirm(){
    this.confirmEvent.emit(true);
  }
  onCancel(){
    this.confirmEvent.emit(false);
  }
}
