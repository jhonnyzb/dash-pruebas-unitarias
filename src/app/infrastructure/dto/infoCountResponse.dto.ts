/**
 * Interfaz que representa la respuesta detallada de información de conteo.
 * @interface
 */
export interface infoCountDetailResponseDTO {
  accountId: number;
  segment: string;
  agency: string;
  regional: string[];
}


/**
 * Interfaz que representa la respuesta de conteo de información.
 * @param dataUser - Detalles de conteo de información del usuario.
 */
export interface infoCountResponseDTO {
  dataUser: infoCountDetailResponseDTO;
}

