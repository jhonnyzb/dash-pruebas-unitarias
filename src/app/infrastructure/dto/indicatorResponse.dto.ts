
/**
 * Interfaz que representa un DTO (Data Transfer Object) para una respuesta de indicador.
 *
 * @param programId - El ID del programa asociado al indicador.
 * @param identification - La identificación del indicador.
 * @param role - El rol del indicador.
 * @param regional - La región del indicador.
 * @param agency - La agencia del indicador.
 * @param segment - El segmento del indicador.
 * @param variable - La variable del indicador.
 * @param target - El objetivo del indicador.
 * @param compliance - El cumplimiento del indicador.
 * @param pointsEarned - Los puntos obtenidos del indicador.
 * @param rankinCountry - El ranking del indicador a nivel país.
 * @param rankinAgency - El ranking del indicador a nivel agencia.
 * @param rankinRegion - El ranking del indicador a nivel región.
 */
export interface IndicatorDTO {
  programId: number | string;
  identification: string;
  role: string;
  regional: string;
  agency: string;
  segment: string;
  variable: string;
  target: number;
  compliance: number;
  pointsEarned: number | string;
  rankinCountry: number;
  rankinAgency: number;
  rankinRegion: number;
}

/**
 * Interfaz que representa un medio de indicador.
 *
 * @param upload_Date - La fecha de carga del medio.
 * @param compliances - Los indicadores de cumplimiento.
 */
export interface IndicatorMedium {
  upload_Date: string;
  compliances: IndicatorDTO[];
}

/**
 * Interfaz que representa la respuesta de un indicador.
 * @param data - Arreglo de objetos de tipo IndicatorMedium que contiene los datos del indicador.
 */
export interface IndicatorResponseDTO {
  data: IndicatorMedium[]
}
