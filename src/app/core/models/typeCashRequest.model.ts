
export class TypeModelRequestModel {
  /**
 * Modelo de solicitud para el tipo de modelo de solicitud.
 *
 * @param RedemptionProcessId - El ID del proceso de redención.
 * @param PageNumber - El número de página.
 * @param PageSize - El tamaño de la página.
 */
  constructor(
    public RedemptionProcessId: number,
    public PageNumber: number,
    public PageSize: number,

  ) { }
}
