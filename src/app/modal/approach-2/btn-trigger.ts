import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-trigger',
  imports: [],
  template: `
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    @if(icon){}
    {{txtBtnOpenModal}}
  </button>
  `,
})
export class BtnTrigger {
  @Input() txtBtnOpenModal = "Open Modal";
  @Input() icon = "";
}
