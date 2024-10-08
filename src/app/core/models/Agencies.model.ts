

export class AgenciesModel {
  /**
 * Modelo de Agencias.
 *
 * @param {number} AgencyId - El ID de la agencia.
 * @param {string} Name - El nombre de la agencia.
 */
  constructor(
    public AgencyId: number,
    public Name: string,
  ) { }
}
