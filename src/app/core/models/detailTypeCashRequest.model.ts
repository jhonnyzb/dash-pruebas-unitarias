
export class DetailTypeModelRequestModel {
  /**
 * Modelo de solicitud para el detalle del tipo de modelo de solicitud.
 *
 * @param RedemptionProcessDetailId - El ID del detalle del proceso de redención.
 * @param PageNumber - El número de página.
 * @param PageSize - El tamaño de la página.
 */
  constructor(
    public RedemptionProcessDetailId: number,
    public PageNumber: number,
    public PageSize: number,

  ) { }
}
