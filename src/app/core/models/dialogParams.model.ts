/**
 * Interfaz que representa los parámetros de un diálogo.
 * @param success - Indica si la operación fue exitosa.
 * @param confirmText - Texto de confirmación.
 * @param title - Título del diálogo.
 * @param error - Indica si ocurrió un error.
 * @param navigation - Navegación asociada.
 * @param buttonNavigationText - Texto del botón de navegación.
 * @param buttonSecondNavigationText - Texto del segundo botón de navegación.
 * @param isbutton - Indica si es un botón.
 * @param aditionalText - Texto adicional.
 * @param aditional - Información adicional.
 * @param category - Categoría.
 * @param edit - Indica si se está editando.
 * @param data - Datos asociados.
 * @param parameterText - Texto del parámetro.
 * @param settlementId - ID del asentamiento.
 */
export interface DialogParams {
  success: boolean;
  confirmText?: string;
  title?: string;
  error?: boolean;
  navigation?: string,
  buttonNavigationText?: string;
  buttonSecondNavigationText?: string;
  isbutton?: boolean;
  aditionalText?: string;
  aditional?: string;
  category?: string;
  edit?: boolean;
  data?: any;
  parameterText?: string;
  settlementId?: number;
}
