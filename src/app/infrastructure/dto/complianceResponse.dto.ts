/**
 * Interfaz que representa la información de cumplimiento de las normas.
 * @param variable - La variable asociada al cumplimiento.
 * @param target - El objetivo de cumplimiento.
 * @param compliance - El nivel de cumplimiento.
 * @param points - Los puntos obtenidos.
 */
export interface compliancesInfoDTO {
  variable: string;
  target: number;
  compliance: number;
  points: number
}

/**
 * Interfaz que representa la respuesta de cumplimientos.
 *
 * @param cumplimientosInfo - La información de los cumplimientos.
 */
export interface compliancesResponseDTO {
  cumplimientosInfo: compliancesInfoDTO[];
}

