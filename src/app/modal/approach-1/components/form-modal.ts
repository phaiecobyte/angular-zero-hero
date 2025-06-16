import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseModalComponent } from './base-modal';
import { FormModalData } from '../models/modal-data';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ data.title || 'Form' }}</h5>
          <button *ngIf="config.showCloseButton" type="button" class="btn-close" (click)="close()"></button>
        </div>
        <div class="modal-body">
          <form [formGroup]="form" (ngSubmit)="submit()">
            <div class="mb-3">
              <label *ngIf="data.label" [for]="formControlId" class="form-label">{{ data.label }}</label>
              <input 
                type="text" 
                [id]="formControlId"
                class="form-control" 
                [placeholder]="data.placeholder || ''" 
                formControlName="value"
              >
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" (click)="close()">
            {{ data.cancelText || 'Cancel' }}
          </button>
          <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="submit()">
            {{ data.submitText || 'Submit' }}
          </button>
        </div>
      </div>
    </div>
    
  `,
  styleUrls: ['./modal.scss']
 
})
export class FormModalComponent extends BaseModalComponent implements OnInit {
  /** Modal data with type safety */
  data!: FormModalData;
  
  /** Reactive form */
  form!: FormGroup;
  
  /** Unique ID for form element */
  formControlId = `form-control-${Date.now()}`;
  
  /** Form builder for creating reactive forms */
  private fb = inject(FormBuilder);
  
  /** 
   * Initialize component 
   */
  override ngOnInit(): void {
    // Get data from modal reference
    this.data = this.modalRef.data;
    
    // Create form
    this.form = this.fb.group({
      value: [this.data.initialValue || '', Validators.required]
    });
    
    super.ngOnInit();
  }
  
  /**
   * Handle form submission
   */
  submit(): void {
    if (this.form.valid) {
      this.close(this.form.value.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}