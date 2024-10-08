/**
 * Interfaz que representa los datos de un usuario.
 * @param idCuenta - El ID de la cuenta del usuario.
 * @param cargo - El cargo del usuario.
 * @param segmento - El segmento al que pertenece el usuario.
 * @param agencia - La agencia a la que está asociado el usuario.
 * @param regional - La región a la que pertenece el usuario.
 */
export interface userDTO {
  idCuenta: number;
  cargo: string;
  segmento: string;
  agencia: string;
  regional: string;
}

/**
 * Interfaz que representa los datos de un afiliado en relación a su cumplimiento de normativas.
 *
 * @param variable - La variable relacionada al afiliado.
 * @param meta - El valor de la meta establecida para el cumplimiento.
 * @param cumplimiento - El valor del cumplimiento alcanzado por el afiliado.
 * @param puntos - El número de puntos obtenidos por el afiliado.
 */
export interface CompliancesAffiliateDTO {
  variable: string;
  meta: number;
  cumplimiento: number;
  puntos: number
}

/**
 * Interfaz que representa los datos de un afiliado.
 * @interface
 */
export interface AffiliateDTO {
  dataUser: userDTO;
  cumplimientosInfo: CompliancesAffiliateDTO[];
}

