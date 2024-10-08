
export class ReportsResponseModel {
  /**
 * Clase que representa el modelo de respuesta de informes.
 *
 * @param {ProcessesModel} Processes - El objeto que contiene los procesos.
 */
  constructor(
    public Processes: ProcessesModel,
  ) { }
}


export class ProcessesModel {
  /**
 * Clase que representa el modelo de respuesta de los informes.
 *
 * @param Data - Arreglo de objetos DaumModel que contiene los datos del informe.
 * @param Pagination - Objeto PaginationRuleModel que contiene las reglas de paginación del informe.
 */
  constructor(
    public Data: DaumModel[],
    public Pagination: PaginationRuleModel,
  ) { }
}



export class DaumModel {
  /**
 * Modelo de respuesta para los informes de Daum.
 *
 * @param RedemptionProcessId - El ID del proceso de redención.
 * @param DateRegister - La fecha de registro.
 * @param ProcessType - El tipo de proceso.
 * @param Status - El estado.
 * @param StatusId - El ID del estado.
 */
  constructor(
    public RedemptionProcessId: number,
    public DateRegister: string,
    public ProcessType: string,
    public Status: string,
    public StatusId: number,
  ) { }
}



export class PaginationRuleModel {
  /**
 * Clase que representa el modelo de regla de paginación.
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
