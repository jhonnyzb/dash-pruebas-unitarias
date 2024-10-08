/**
 * Interfaz que representa la respuesta de un formato de descarga.
 * @param parametersList - Lista de parámetros del formato de descarga.
 */
export interface DownloadFormatResponseDto {
  parametersList: ParameterDto[];
}

/**
 * Interfaz que representa un parámetro.
 * @param parameterId - El ID del parámetro.
 * @param programId - El ID del programa.
 * @param conceptId - El ID del concepto.
 * @param parameterName - El nombre del parámetro.
 * @param parameterValue - El valor del parámetro.
 */
export interface ParameterDto {
  parameterId: number;
  programId: number;
  conceptId: number;
  parameterName: string;
  parameterValue: string;
}
