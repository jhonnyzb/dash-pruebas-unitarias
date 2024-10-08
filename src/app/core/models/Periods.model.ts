

export class PeriodsModel {
  /**
 * Modelo de períodos.
 *
 * @param PeriodId - El ID del período.
 * @param ProgramId - El ID del programa.
 * @param Name - El nombre del período.
 * @param Status - El estado del período.
 * @param DateInitial - La fecha inicial del período.
 * @param DateFinal - La fecha final del período.
 * @param ExpirationDate - La fecha de vencimiento del período.
 */
  constructor(
    public PeriodId: number,
    public ProgramId: number,
    public Name: string,
    public Status: boolean,
    public DateInitial: string,
    public DateFinal: string,
    public ExpirationDate: string,
  ) { }
}
