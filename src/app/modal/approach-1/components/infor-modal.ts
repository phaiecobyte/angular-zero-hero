import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoModalData } from '../models/modal-data';
import { BaseModalComponent } from './base-modal';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <i *ngIf="data.iconClass" [class]="data.iconClass + ' me-2'"></i>
            {{ data.title || 'Information' }}
          </h5>
          <button *ngIf="config.showCloseButton" type="button" class="btn-close" (click)="close()"></button>
        </div>
        <div class="modal-body">
          <p>{{ data.message }}</p>
          <div class="alert alert-info mt-3" *ngIf="data.additionalInfo">
            {{ data.additionalInfo }}
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="close()">
            {{ data.buttonText || 'OK' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.scss']
})
export class InfoModalComponent extends BaseModalComponent implements OnInit {
  /** Modal data with type safety */
  data!: InfoModalData;
  
  /** 
   * Initialize component 
   */
  override ngOnInit(): void {
    // Get data from modal reference
    this.data = this.modalRef.data;
    super.ngOnInit();
  }
}