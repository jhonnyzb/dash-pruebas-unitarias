

export class RegionalModel {
  /**
 * Modelo para representar una región.
 *
 * @param RegionalId - El ID de la región.
 * @param ProgramId - El ID del programa asociado a la región.
 * @param Name - El nombre de la región.
 * @param Status - El estado de la región.
 */
  constructor(
    public RegionalId: number,
    public ProgramId: number,
    public Name: string,
    public Status: boolean,
  ) { }
}
