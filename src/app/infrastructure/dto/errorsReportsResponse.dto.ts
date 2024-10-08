/**
 * Interfaz que representa la respuesta de los informes de errores.
 * @interface
 * @name ErrorsReportsResponseDto
 */
export interface ErrorsReportsResponseDto {
  errors: ErrorsDto,
}

/**
 * Interfaz que representa los errores en un objeto de respuesta.
 * @param data - Los errores en forma de arreglo de objetos DaumErrorsDto.
 * @param pagination - La información de paginación de los errores en forma de objeto PaginationErrorsRuleDto.
 */
export interface ErrorsDto {
  data: DaumErrorsDto[],
  pagination: PaginationErrorsRuleDto,
}


/**
 * Interfaz que representa los errores de Daum.
 *
 * @param redemptionProcessDetailId - El ID del detalle del proceso de redención.
 * @param errorDetail - Detalle del error.
 * @param index - El índice.
 * @param identificationNumber - Número de identificación.
 * @param isValid - Indica si es válido o no.
 */
export interface DaumErrorsDto {
  redemptionProcessDetailId: number,
  errorDetail: string,
  index: number,
  identificationNumber: string,
  isValid: boolean,
}


/**
 * Interfaz que representa los datos de paginación de los errores de un informe.
 *
 * @param pageSize - El tamaño de la página.
 * @param pageNumber - El número de la página.
 * @param totalElements - El número total de elementos.
 * @param totalPages - El número total de páginas.
 */
export interface PaginationErrorsRuleDto {
  pageSize: number,
  pageNumber: number,
  totalElements: number,
  totalPages: number,
}
