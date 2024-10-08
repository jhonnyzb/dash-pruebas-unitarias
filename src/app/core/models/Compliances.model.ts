
export class CompliancesInfoModel {

  /**
   * Modelo de información para cumplimientos.
   *
   * @param Indicator - Indicador del cumplimiento.
   * @param Finishline - Línea de meta del cumplimiento.
   * @param Compliance - Cumplimiento.
   * @param Points - Puntos del cumplimiento.
   * @param ProgramId - ID del programa (opcional).
   * @param Identification - Identificación (opcional).
   * @param Role - Rol (opcional).
   * @param Regional - Regional (opcional).
   * @param Agency - Agencia (opcional).
   * @param Segment - Segmento (opcional).
   * @param RankinCountry - Clasificación en el país.
   * @param RankinAgency - Clasificación en la agencia.
   * @param RankinRegion - Clasificación en la región.
   */
  constructor(
    public Indicator: string,
    public Finishline: number,
    public Compliance: number,
    public Points: number | string,
    public ProgramId?: number | string,
    public Identification?: number | string,
    public Role?: string,
    public Regional?: string,
    public Agency?: string,
    public Segment?: string,
    public RankinCountry?: number,
    public RankinAgency?: number,
    public RankinRegion?: number,

  ) { }
}


export class CompliancesModel {
  /**
* Clase que representa el modelo de Cumplimientos.
*
* @param CumplimientosInfo - Información de los cumplimientos.
* @param dateUpload - Fecha de carga (opcional).
*/
  constructor(
    public CumplimientosInfo: CompliancesInfoModel[],
    public dateUpload?: string
  ) { }
}
