import { Component, OnInit } from '@angular/core';
import { Modal } from "./modal";
import { BtnTrigger } from "./btn-trigger";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-approach2',
  imports: [Modal, BtnTrigger,ReactiveFormsModule],
  template: `
    <app-btn-trigger></app-btn-trigger>
    <app-modal
    (saveClicked)="onSave()"
    >
    <form [formGroup]="frm">
      <div class="mb-2">
        <label for="" class="form-label">Username</label>
        <input type="text" class="form-control" formControlName="username">
      </div>
    </form>
    </app-modal>
    <button class="btn btn-danger" (click)="onSave()">click me</button>
  `,
  styles: ``
})
export class Approach2 implements OnInit{
  frm!:FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
      this.frm = this.fb.group({
        username:['useranme']
      })
  }

  onSave=()=>{
    alert('You click me!');
    console.log('You click me',this.frm.value);
    document.getElementById('staticBackdrop')?.click();
  }
}
