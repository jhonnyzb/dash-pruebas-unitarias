
export class ErrorsReportsResponseModel {
  /**
 * Modelo de respuesta para informes de errores.
 *
 * @param Errors - El modelo de errores.
 */
  constructor(
    public Errors: ErrorsModel,
  ) { }
}


export class ErrorsModel {
  /**
 * Clase que representa el modelo de errores.
 *
 * @param {DaumErrorsModel[]} Data - Los datos de los errores.
 * @param {PaginationErrorsRuleModel} Pagination - La paginación de los errores.
 */
  constructor(
    public Data: DaumErrorsModel[],
    public Pagination: PaginationErrorsRuleModel,
  ) { }
}



export class DaumErrorsModel {
  /**
 * Modelo de errores de Daum.
 *
 * @param RedemptionProcessDetailId - El ID del detalle del proceso de redención.
 * @param ErrorDetail - Detalle del error.
 * @param Index - El índice.
 * @param IdentificationNumber - Número de identificación.
 * @param IsValid - Indica si es válido o no.
 */
  constructor(
    public RedemptionProcessDetailId: number,
    public ErrorDetail: string,
    public Index: number,
    public IdentificationNumber: string,
    public IsValid: boolean,
  ) { }
}



export class PaginationErrorsRuleModel {
  /**
 * Modelo de respuesta para informes de errores con paginación.
 *
 * @param PageSize - El tamaño de la página.
 * @param PageNumber - El número de la página.
 * @param TotalElements - El número total de elementos.
 * @param TotalPages - El número total de páginas.
 */
  constructor(
    public PageSize: number,
    public PageNumber: number,
    public TotalElements: number,
    public TotalPages: number,
  ) { }
}
