import { Component, inject } from '@angular/core';
import { ModalService } from './services/modal.service';
import { firstValueFrom } from 'rxjs';
import { ModalContainerComponent } from "./container/modal-container";

@Component({
  selector: 'app-approach1',
  imports: [ModalContainerComponent],
  template: `
    <div class="container mt-5">
      <h1>Advanced Modal System Demo</h1>
      
      <div class="row mt-4">
        <div class="col">
          <div class="d-flex gap-3">
            <button class="btn btn-danger" (click)="openConfirmModal()">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>Confirm Action
            </button>
            
            <button class="btn btn-info" (click)="openInfoModal()">
              <i class="bi bi-info-circle-fill me-2"></i>Show Information
            </button>
            
            <button class="btn btn-primary" (click)="openFormModal()">
              <i class="bi bi-pencil-fill me-2"></i>Open Form
            </button>
            
            <button class="btn btn-warning" (click)="openSequentialModals()">
              <i class="bi bi-arrow-repeat me-2"></i>Sequential Modals
            </button>
          </div>
        </div>
      </div>
      
      <!-- Modal container component -->
      <app-modal-container></app-modal-container>
    </div>
  `,
  styles: ``
})
export class Approach1 {
  private modalService = inject(ModalService);
  
  /**
   * Open a confirm modal
   */
  openConfirmModal(): void {
    const modalRef = this.modalService.confirm({
      title: 'Confirm Action',
      message: 'Are you sure you want to perform this action?',
      confirmText: 'Yes, Proceed',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn btn-danger'
    });
    
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed action');
      } else {
        console.log('User cancelled action');
      }
    });
  }
  
  /**
   * Open an information modal
   */
  openInfoModal(): void {
    this.modalService.info({
      title: 'Information',
      message: 'This is an informational message.',
      additionalInfo: 'Additional details can go here.',
      iconClass: 'bi bi-info-circle-fill'
    });
  }
  
  /**
   * Open a form modal
   */
  openFormModal(): void {
    const modalRef = this.modalService.form({
      title: 'Enter Information',
      label: 'Your Name',
      placeholder: 'Enter your full name',
      submitText: 'Submit',
      initialValue: ''
    });
    
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted with value:', result);
      } else {
        console.log('Form cancelled');
      }
    });
  }
  
  /**
   * Example of sequential modals
   */
  async openSequentialModals(): Promise<void> {
    const confirm = await firstValueFrom(
      this.modalService.confirm({
        title: 'Start Process',
        message: 'Do you want to start the sequential modal process?'
      }).afterClosed()
    );
    
    if (!confirm) return;
    
    await firstValueFrom(
      this.modalService.info({
        title: 'Step 1',
        message: 'This is the first step in our process.',
        buttonText: 'Next'
      }).afterClosed()
    );
    
    const name = await firstValueFrom(
      this.modalService.form({
        title: 'Step 2',
        label: 'Your Name',
        placeholder: 'Enter your name'
      }).afterClosed()
    );
    
    if (name) {
      this.modalService.info({
        title: 'Process Complete',
        message: `Thank you, ${name}! The process is now complete.`,
        iconClass: 'bi bi-check-circle-fill'
      });
    }
  }
}
