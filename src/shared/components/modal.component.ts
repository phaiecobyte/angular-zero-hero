import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Trigger Button -->
    <button
      *ngIf="!hideButton"
      type="button"
      class="btn"
      [ngClass]="btnClass"
      data-bs-toggle="modal"
      [attr.data-bs-target]="'#' + id"
      [attr.aria-label]="buttonAriaLabel || launchText"
    >
      {{ launchText }}
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      [id]="id"
      tabindex="-1"
      [attr.aria-labelledby]="id + 'Label'"
      aria-hidden="true"
      [attr.data-bs-backdrop]="backdrop ? 'true' : 'static'"
      [attr.data-bs-keyboard]="keyboard.toString()"
    >
      <div 
        class="modal-dialog" 
        [ngClass]="[
          'modal-' + size,
          centered ? 'modal-dialog-centered' : '',
          scrollable ? 'modal-dialog-scrollable' : '',
          fullscreen ? 'modal-fullscreen' : ''
        ]"
      >
        <div class="modal-content">
          <div class="modal-header" *ngIf="!hideHeader">
            <h5 class="modal-title" [id]="id + 'Label'">{{ title }}</h5>
            <button 
              *ngIf="showClose" 
              type="button" 
              class="btn-close" 
              data-bs-dismiss="modal" 
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body" [ngClass]="bodyClass">
            <ng-content></ng-content>
          </div>

          <div class="modal-footer" *ngIf="showFooter">
            <ng-content select="[modal-footer]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() id!: string;
  @Input() title: string = 'Modal';
  @Input() size: 'sm' | 'lg' | 'xl' | '' = '';
  @Input() showFooter: boolean = true;
  @Input() launchText: string = 'Open Modal';
  @Input() btnClass: string = 'btn-primary';
  
  // New properties
  @Input() hideButton: boolean = false;
  @Input() hideHeader: boolean = false;
  @Input() showClose: boolean = true;
  @Input() centered: boolean = true;
  @Input() scrollable: boolean = false;
  @Input() fullscreen: boolean = false;
  @Input() backdrop: boolean = true;
  @Input() keyboard: boolean = true;
  @Input() bodyClass: string = '';
  @Input() buttonAriaLabel: string = '';
  
  @Output() modalOpened = new EventEmitter<void>();
  @Output() modalClosed = new EventEmitter<void>();
  
  ngOnInit() {
    if (!this.id) {
      console.error('Modal component requires an id attribute');
    }
    
    // Add event listeners for Bootstrap modal events
    if (typeof document !== 'undefined') {
      const modalElement = document.getElementById(this.id);
      if (modalElement) {
        modalElement.addEventListener('shown.bs.modal', () => {
          this.modalOpened.emit();
        });
        
        modalElement.addEventListener('hidden.bs.modal', () => {
          this.modalClosed.emit();
        });
      }
    }
  }
  
  ngOnDestroy() {
    // Clean up event listeners
    if (typeof document !== 'undefined') {
      const modalElement = document.getElementById(this.id);
      if (modalElement) {
        modalElement.removeEventListener('shown.bs.modal', () => {
          this.modalOpened.emit();
        });
        
        modalElement.removeEventListener('hidden.bs.modal', () => {
          this.modalClosed.emit();
        });
      }
    }
  }
}
