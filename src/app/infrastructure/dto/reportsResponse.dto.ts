/**
 * Interfaz que representa la respuesta de los informes.
 * @param processes - Objeto que contiene los procesos.
 */
export interface ReportsResponseDto {
  processes: ProcessesDto,
}

/**
 * Interfaz que representa los datos de los procesos.
 * @param data - Los datos de los procesos.
 * @param pagination - La regla de paginación.
 */
export interface ProcessesDto {
  data: DaumDto[],
  pagination: PaginationRuleDto,
}


/**
 * Interfaz que representa los datos de un objeto Daum.
 *
 * @param redemptionProcessId - El ID del proceso de redención.
 * @param dateRegister - La fecha de registro.
 * @param processType - El tipo de proceso.
 * @param status - El estado.
 * @param statusId - El ID del estado.
 */
export interface DaumDto {
  redemptionProcessId: number,
  dateRegister: string,
  processType: string,
  status: string,
  statusId: number,
}


/**
 * Interfaz que representa los datos de paginación de un informe.
 *
 * @param pageSize - El tamaño de la página.
 * @param pageNumber - El número de la página.
 * @param totalElements - El número total de elementos.
 * @param totalPages - El número total de páginas.
 */
export interface PaginationRuleDto {
  pageSize: number,
  pageNumber: number,
  totalElements: number,
  totalPages: number,
}
