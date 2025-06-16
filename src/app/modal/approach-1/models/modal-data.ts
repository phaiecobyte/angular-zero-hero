/**
 * Base interface for modal data
 */
export interface ModalData {
  /** Modal title */
  title?: string;
}

/**
 * Interface for confirm modal data
 */
export interface ConfirmModalData extends ModalData {
  /** Message to display */
  message: string;
  /** Text for confirm button */
  confirmText?: string;
  /** Text for cancel button */
  cancelText?: string;
  /** CSS class for confirm button */
  confirmButtonClass?: string;
  /** CSS class for cancel button */
  cancelButtonClass?: string;
  /** Whether to show cancel button */
  showCancelButton?: boolean;
}

/**
 * Interface for information modal data
 */
export interface InfoModalData extends ModalData {
  /** Message to display */
  message: string;
  /** Additional information (optional) */
  additionalInfo?: string;
  /** Button text */
  buttonText?: string;
  /** Icon class (for Bootstrap icons) */
  iconClass?: string;
}

/**
 * Interface for form modal data
 */
export interface FormModalData extends ModalData {
  /** Initial form value */
  initialValue?: any;
  /** Placeholder for the form */
  placeholder?: string;
  /** Label text */
  label?: string;
  /** Submit button text */
  submitText?: string;
  /** Cancel button text */
  cancelText?: string;
}