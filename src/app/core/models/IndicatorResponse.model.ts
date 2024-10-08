
export class IndicatorModel {
  /**
 * Clase que representa el modelo de respuesta de un indicador.
 *
 * @param rol - El rol asociado al indicador.
 * @param regional - La región asociada al indicador.
 * @param agency - La agencia asociada al indicador.
 * @param segment - El segmento asociado al indicador.
 * @param points - Los puntos asociados al indicador.
 * @param indicator - El indicador.
 * @param finishline - La línea de finalización del indicador.
 * @param compliance - El nivel de cumplimiento del indicador.
 * @param rankinPais - El ranking a nivel de país del indicador.
 * @param rankinAgencia - El ranking a nivel de agencia del indicador.
 * @param rankinRegion - El ranking a nivel de región del indicador.
 */
  constructor(
    public rol?: string,
    public regional?: string,
    public agency?: string,
    public segment?: string,
    public points?: string,
    public indicator?: string,
    public finishline?: number,
    public compliance?: number,
    public rankinPais?: number,
    public rankinAgencia?: number,
    public rankinRegion?: number,
  ) { }
}


export class IndicatorResponseModel {
  /**
* Modelo de respuesta para indicadores.
*
* @param indicators - Lista de modelos de indicadores.
* @param dateUpload - Fecha de carga (opcional).
*/
  constructor(
    public indicators: IndicatorModel[],
    public dateUpload?: string
  ) { }
}
