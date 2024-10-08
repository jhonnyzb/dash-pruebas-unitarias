

export class SegmentsModel {
  /**
 * Modelo de segmentos.
 *
 * @param ClusterId - El ID del clúster.
 * @param ProgramId - El ID del programa.
 * @param Name - El nombre del segmento.
 * @param PointValue - El valor del punto.
 * @param Active - Indica si el segmento está activo o no.
 */
  constructor(
    public ClusterId: number,
    public ProgramId: number,
    public Name: string,
    public PointValue: number,
    public Active: boolean,
  ) { }
}
