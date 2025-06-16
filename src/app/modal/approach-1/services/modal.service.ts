import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from '../models/modal-config';
import { ModalRef } from '../models/modal-ref';
import { ConfirmModalData, FormModalData, InfoModalData } from '../models/modal-data';
import { FormModalComponent } from '../components/form-modal';
import { InfoModalComponent } from '../components/infor-modal';
import { ConfirmModalComponent } from '../components/confirm-modal';

/**
 * Interface for modal open requests
 */
interface ModalRequest {
  component: any;
  data: any;
  config?: ModalConfig;
}

/**
 * Service for creating and managing modals
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /** Subject for modal open requests */
  private modalRequestsSubject = new Subject<ModalRequest>();
  
  /** Observable for modal open requests */
  readonly modalRequests$ = this.modalRequestsSubject.asObservable();
  
  /** Reference to modal container component */
  private containerComponent: any;
  
  /**
   * Register modal container component
   */
  registerContainer(containerComponent: any): void {
    this.containerComponent = containerComponent;
  }
  
  /**
   * Open a modal with custom component
   */
  open<T = any, R = any>(component: any, data?: T, config?: ModalConfig): ModalRef<R> {
    // Validate container is registered
    if (!this.containerComponent) {
      throw new Error('Modal container not registered. Add <app-modal-container> to your app.');
    }
    
    // Send open request
    this.modalRequestsSubject.next({
      component,
      data,
      config
    });
    
    // Return ModalRef from container
    return this.containerComponent.createModal(component, data, config);
  }
  
  /**
   * Open a confirmation modal
   */
  confirm(data: ConfirmModalData, config?: ModalConfig): ModalRef<boolean> {
    return this.open<ConfirmModalData, boolean>(ConfirmModalComponent, data, config);
  }
  
  /**
   * Open an information modal
   */
  info(data: InfoModalData, config?: ModalConfig): ModalRef<void> {
    return this.open<InfoModalData, void>(InfoModalComponent, data, config);
  }
  
  /**
   * Open a form modal
   */
  form(data: FormModalData, config?: ModalConfig): ModalRef<string> {
    return this.open<FormModalData, string>(FormModalComponent, data, config);
  }
}