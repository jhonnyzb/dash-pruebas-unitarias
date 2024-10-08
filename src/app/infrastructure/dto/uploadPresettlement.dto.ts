/**
 * Interfaz para la solicitud de carga de preajuste de liquidación.
 * @param typeOfCash - El tipo de efectivo.
 * @param file - El archivo de solicitud.
 */
export interface UploadtypeOfCashRequestDto {
  typeOfCash: number;
  file: FileRequestDto;
}

/**
 * Interfaz que representa los datos de una solicitud de archivo.
 * @param name - El nombre del archivo.
 * @param extension - La extensión del archivo.
 * @param data - Los datos del archivo en formato de cadena.
 */
export interface FileRequestDto {
  name: string;
  extension: string;
  data: string;
}


/**
 * Interfaz que representa la respuesta de la carga de un archivo.
 * @param redemptionProcessId - El ID del proceso de redención.
 */
export interface UploadFileResponseDto {
  redemptionProcessId: number,
}
