import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal';
import { ConfirmModalData } from '../models/modal-data';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ data.title }}</h5>
          <button *ngIf="config.showCloseButton" type="button" class="btn-close" (click)="close()"></button>
        </div>
        <div class="modal-body">
          <p>{{ data.message }}</p>
        </div>
        <div class="modal-footer">
          <button 
            *ngIf="data.showCancelButton !== false" 
            type="button" 
            [class]="data.cancelButtonClass || 'btn btn-secondary'" 
            (click)="close(false)"
          >
            {{ data.cancelText || 'Cancel' }}
          </button>
          <button 
            type="button" 
            [class]="data.confirmButtonClass || 'btn btn-primary'" 
            (click)="confirm()"
          >
            {{ data.confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.scss']
})
export class ConfirmModalComponent extends BaseModalComponent implements OnInit {
  /** Modal data with type safety */
  data!: ConfirmModalData;
  
  /** 
   * Initialize component 
   */
  override ngOnInit(): void {
    // Get data from modal reference
    this.data = this.modalRef.data;
    super.ngOnInit();
  }
  
  /**
   * Handle confirmation click
   */
  confirm(): void {
    this.close(true);
  }
  
  /**
   * Handle Enter key for quick confirmation
   */
  @HostListener('document:keydown.enter')
  onEnterKey(): void {
    this.confirm();
  }
}