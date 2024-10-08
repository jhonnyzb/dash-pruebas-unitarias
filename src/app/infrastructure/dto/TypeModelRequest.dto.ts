
/**
 * Interfaz que representa una solicitud de modelo de tipo.
 * @param redemptionProcessId - El ID del proceso de redención.
 * @param pageNumber - El número de página.
 * @param pageSize - El tamaño de página.
 */
export interface TypeModelRequestDto {
  redemptionProcessId: number;
  pageNumber: number
  pageSize: number
}



