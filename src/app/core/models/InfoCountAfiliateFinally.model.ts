
export class InfoCountModel {

  /**
   * Modelo de información para contar afiliados finalmente.
   *
   * @param AccountId - El ID de la cuenta.
   * @param Segment - El segmento.
   * @param Agency - La agencia.
   * @param Regional - Las regionales.
   */
  constructor(
    public AccountId: number,
    public Segment: string,
    public Agency: string,
    public Regional: string[],


  ) { }
}


export class InfoCountAfiliateFinallyModel {
  /**
* Modelo para almacenar la información de recuento de afiliados finalmente.
*
* @param dataUser - Objeto que contiene la información de recuento.
*/
  constructor(
    public dataUser: InfoCountModel,

  ) { }
}
