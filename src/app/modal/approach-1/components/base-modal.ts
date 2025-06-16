import { Component, ElementRef, HostListener, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { ModalRef } from '../models/modal-ref';
import { DEFAULT_MODAL_CONFIG, ModalConfig } from '../models/modal-config';

/**
 * Base component that all modal components should extend.
 * Handles common modal behaviors like backdrop clicking and escape key.
 */
@Component({
  template: '',
  standalone: true,
  imports: [CommonModule]
})
export abstract class BaseModalComponent implements OnInit, OnDestroy {
  /** Modal reference for controlling from outside */
  modalRef = inject(ModalRef);
  
  /** Element reference for DOM manipulation */
  protected elementRef = inject(ElementRef);
  
  /** Renderer for DOM manipulation */
  protected renderer = inject(Renderer2);
  
  /** Modal configuration */
  config: ModalConfig = DEFAULT_MODAL_CONFIG;
  
  /** Stored listener removers */
  private listeners: (() => void)[] = [];
  
  /** Whether modal is currently closing - prevents multiple close attempts */
  private isClosing = false;
  
  /** 
   * Handle backdrop clicks if enabled in config
   */
  @HostListener('click', ['$event'])
  onBackdropClick(event: MouseEvent): void {
    if (
      this.config.backdropClose &&
      event.target === this.elementRef.nativeElement
    ) {
      this.close();
    }
  }
  
  /** Initialize modal */
  ngOnInit(): void {
    this.setupModal();
    
    // Handle escape key if enabled
    if (this.config.escapeClose) {
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(takeUntilDestroyed())
        .subscribe(event => {
          if (event.key === 'Escape') {
            this.close();
          }
        });
    }
    
    // Prevent body scrolling while modal is open
    this.renderer.addClass(document.body, 'modal-open');
    
    // Set modal width
    if (this.config.width) {
      const modalContent = this.elementRef.nativeElement.querySelector('.modal-dialog');
      if (modalContent) {
        this.renderer.setStyle(modalContent, 'max-width', this.config.width);
      }
    }
  }
  
  /** Clean up when component is destroyed */
  ngOnDestroy(): void {
    // Remove body class
    this.renderer.removeClass(document.body, 'modal-open');
    
    // Remove all listeners
    this.listeners.forEach(remove => remove());
  }
  
  /**
   * Close the modal with optional result data
   */
  close(result?: any): void {
    if (this.isClosing) return;
    
    this.isClosing = true;
    this.modalRef.close(result);
  }
  
  /**
   * Setup modal specific behaviors
   */
  protected setupModal(): void {
    // Apply z-index if specified
    if (this.config.zIndex) {
      this.renderer.setStyle(
        this.elementRef.nativeElement, 
        'z-index', 
        this.config.zIndex
      );
    }
    
    // Apply additional backdrop styles
    if (this.config.backdropStyle) {
      Object.entries(this.config.backdropStyle).forEach(([prop, value]) => {
        this.renderer.setStyle(this.elementRef.nativeElement, prop, value);
      });
    }
    
    // Apply custom CSS class if specified
    if (this.config.cssClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.config.cssClass);
    }
  }
}