import { Subject } from 'rxjs';

/**
 * Reference to an open modal
 * Allows controlling the modal from outside
 */
export class ModalRef<T = any> {
  /** Subject that completes when modal is closed */
  private afterClosed$ = new Subject<T | undefined>();
  
  /** Data that was passed to open the modal */
  data: any;
  
  constructor() {}
  
  /**
   * Closes the modal with the provided result
   * @param result The data to pass back when the modal closes
   */
  close(result?: T): void {
    this.afterClosed$.next(result);
    this.afterClosed$.complete();
  }
  
  /**
   * Observable that emits when the modal is closed
   * Emits the result passed to close()
   */
  afterClosed() {
    return this.afterClosed$.asObservable();
  }
}