
export class UserModel {
  /**
 * Modelo de usuario.
 *
 * @param idCuenta - El ID de la cuenta del usuario.
 * @param occupation - La ocupación del usuario.
 * @param agency - La agencia del usuario.
 * @param segment - El segmento del usuario.
 * @param regional - La región del usuario.
 */
  constructor(
    public idCuenta: number,
    public occupation: string,
    public agency: string,
    public segment: string,
    public regional: string,
  ) { }
}



export class CompliancesAffiliateModel {
  /**
  * Modelo de afiliado de cumplimiento.
  *
  * @param indicator - El indicador del afiliado.
  * @param finishline - La línea de finalización del afiliado.
  * @param compliance - El cumplimiento del afiliado.
  * @param points - Los puntos del afiliado.
  */
  constructor(
    public indicator: string,
    public finishline: number,
    public compliance: number,
    public points: number,
  ) { }
}


export class AffiliateModel {
  /**
* Modelo de afiliado.
*
* @param dataUser - Información del usuario.
* @param cumplimientosInfo - Información de los cumplimientos del afiliado.
*/
  constructor(
    public dataUser: UserModel,
    public cumplimientosInfo: CompliancesAffiliateModel[]
  ) { }
}
