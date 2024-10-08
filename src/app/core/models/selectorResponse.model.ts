
export class SelectorResponseModel {
  /**
 * Clase que representa el modelo de respuesta de un selector.
 *
 * @param selectors - Los selectores disponibles.
 * @param selectors.Segments - Los segmentos disponibles.
 * @param selectors.Regionals - Las regionales disponibles.
 * @param selectors.Agencies - Las agencias disponibles.
 * @param selectors.Rols - Los roles disponibles.
 */
  constructor(
    public selectors: {
      Segments: string[],
      Regionals: string[],
      Agencies: string[],
      Rols: string[],
    }
  ) { }
}


export class SelectorResponseModel1 {
  /**
 * Clase que representa la respuesta de un selector.
 *
 * @param selectors - Los selectores de la respuesta.
 */
  constructor(
    public selectors: string[]
  ) { }
}

export class SelectorResponseModelF {
  /**
   * Modelo de respuesta para el selector.
   *
   * @param idFilter - El identificador del filtro.
   * @param nameFilter - El nombre del filtro.
   */
  constructor(
    public idFilter: number,
    public nameFilter: string,
  ) { }
}


export class SelectorResponseModelFinally {
  /**
   * Clase que representa la respuesta de un selector.
   *
   * @param filters - Los filtros de la respuesta del selector.
   */
  constructor(
    public filters: SelectorResponseModelF[]
  ) { }
}
