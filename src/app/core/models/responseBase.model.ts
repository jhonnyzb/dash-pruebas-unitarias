
export class ResponseBase<T> {
  /**
 * Clase genérica para representar una respuesta base.
 * @template T - El tipo de datos de la propiedad 'data'.
 */
  constructor(
    public codeId: number,
    public message: string,
    public data: T
  ) { }
}
