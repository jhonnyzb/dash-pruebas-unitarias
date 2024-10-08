
export class ErrorResponseModel {
  /**
 * Modelo de respuesta para errores.
 *
 * @param propertyName - El nombre de la propiedad asociada al error.
 * @param errorMessage - El mensaje de error.
 * @param attemptedValue - El valor que se intentó asignar a la propiedad.
 * @param customState - El estado personalizado asociado al error.
 * @param severity - La gravedad del error.
 * @param errorCode - El código de error.
 * @param formattedMessagePlaceholderValues - Los valores de marcador de posición para el mensaje de error formateado.
 */
  constructor(
    public propertyName: string,
    public errorMessage: string,
    public attemptedValue: any,
    public customState: any,
    public severity: number,
    public errorCode: any,
    public formattedMessagePlaceholderValues: any
  ) { }
}

