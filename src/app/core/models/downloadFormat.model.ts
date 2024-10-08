
export class DownloadFormatResponseModel {
  /**
  * Modelo de respuesta para el formato de descarga.
  *
  * @param ParametersList - Lista de parámetros.
  */
  constructor(
    public ParametersList: ParameterModel[],
  ) { }
}


export class ParameterModel {
  /**
 * Clase que representa un modelo de parámetro.
 *
 * @param ParameterId - El ID del parámetro.
 * @param ProgramId - El ID del programa.
 * @param ConceptId - El ID del concepto.
 * @param ParameterName - El nombre del parámetro.
 * @param ParameterValue - El valor del parámetro.
 */
  constructor(
    public ParameterId: number,
    public ProgramId: number,
    public ConceptId: number,
    public ParameterName: string,
    public ParameterValue: string,
  ) { }
}
