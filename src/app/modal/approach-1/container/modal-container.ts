import { 
  Component, 
  ComponentRef,
  createComponent,
  Injector,
  OnDestroy, 
  OnInit, 
  ViewChild, 
  ViewContainerRef,
  inject 
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { BaseModalComponent } from '../components/base-modal';
import { ModalRef } from '../models/modal-ref';
import { DEFAULT_MODAL_CONFIG, ModalConfig } from '../models/modal-config';

/**
 * Container component that hosts dynamically created modals.
 * Should be placed once in the application layout.
 */
@Component({
  selector: 'app-modal-container',
  template: `<ng-container #modalHost></ng-container>`,
})
export class ModalContainerComponent implements OnInit, OnDestroy {
  /** Reference to the container where modals will be inserted */
  @ViewChild('modalHost', { read: ViewContainerRef, static: true })
  modalHost!: ViewContainerRef;
  
  /** Modal service for opening modals */
  private modalService = inject(ModalService);
  private injector = inject(Injector);
  
  /** Current modal component reference */
  private currentModalRef?: ComponentRef<BaseModalComponent>;
  
  /** Subject for managing subscriptions */
  private destroy$ = new Subject<void>();
  
  ngOnInit(): void {
    // Subscribe to modal open requests
    this.modalService.modalRequests$
      .pipe(takeUntil(this.destroy$))
      .subscribe(request => {
        this.createModal(request.component, request.data, request.config);
      });
      
    // Register container with service
    this.modalService.registerContainer(this);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearCurrentModal();
  }
  
  /**
   * Creates and displays a modal component
   */
  createModal<T extends BaseModalComponent>(
    component: any, 
    data: any, 
    config: ModalConfig = {}
  ): ModalRef {
    // Clear any existing modal
    this.clearCurrentModal();
    
    // Create modal reference
    const modalRef = new ModalRef();
    modalRef.data = data;
    
    // Create injector with modal reference
    const modalInjector = Injector.create({
      providers: [{ provide: ModalRef, useValue: modalRef }],
      parent: this.injector
    });
    
    // Create component
    this.currentModalRef = this.modalHost.createComponent(component, {
      injector: modalInjector
    });
    
    // Set component properties
    const instance = this.currentModalRef.instance;
    instance.config = { ...DEFAULT_MODAL_CONFIG, ...config };
    
    // Subscribe to modal close
    modalRef.afterClosed().subscribe(() => {
      this.clearCurrentModal();
    });
    
    // Detect changes
    this.currentModalRef.changeDetectorRef.detectChanges();
    
    return modalRef;
  }
  
  /** 
   * Clears the current modal if any exists 
   */
  clearCurrentModal(): void {
    if (this.currentModalRef) {
      this.currentModalRef.destroy();
      this.currentModalRef = undefined;
    }
  }
}