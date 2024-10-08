/**
 * Interfaz que representa la respuesta de un selector.
 *
 * @param Segments - Los segmentos disponibles.
 * @param Regional - Las regiones disponibles.
 * @param Agency - Las agencias disponibles.
 * @param Role - Los roles disponibles.
 */
export interface SelectorResponseDTO {
  Segments: string[];
  Regional: string[];
  Agency: string[];
  Role: string[];
}

/**
  * @param data - Los datos de la respuesta.
 * @param data.data - Los datos específicos de la respuesta.
 */
export interface SelectorResponseDTO1 {
  data: {
    data: string[];
  }
}


/**
 * @param idFilter - El identificador del filtro.
 * @param nameFilter - El nombre del filtro.
 */
export interface SelectorResponseFDTO {
  idFilter: number;
  nameFilter: string;
}


/**
 * @param filters - Los filtros de la respuesta del selector.
 */
export interface SelectorResponseFDTO1 {
  filters: SelectorResponseFDTO[];
}








