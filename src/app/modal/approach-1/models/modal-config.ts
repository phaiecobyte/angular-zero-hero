/**
 * Configuration options for modals
 */
export interface ModalConfig {
  /** CSS class to add to the modal */
  cssClass?: string;
  /** Whether to close the modal when clicking on the backdrop */
  backdropClose?: boolean;
  /** Whether to close the modal when pressing escape key */
  escapeClose?: boolean;
  /** Width of the modal (default: 500px) */
  width?: string;
  /** Custom backdrop style */
  backdropStyle?: Record<string, string>;
  /** Z-index for the modal (useful for stacking) */
  zIndex?: number;
  /** Whether to show close button in the header */
  showCloseButton?: boolean;
}

/**
 * Default modal configuration
 */
export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  backdropClose: true,
  escapeClose: true,
  showCloseButton: true,
  width: '500px',
  zIndex: 1050
};