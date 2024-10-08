
export class RequestIndicatorsAdmin {
  /**
 * Clase que representa una solicitud de indicadores administrativos.
 *
 * @param Segments - Los segmentos asociados a la solicitud. Puede ser un array de cadenas o números.
 * @param Regionals - Las regionales asociadas a la solicitud. Puede ser un array de cadenas o números.
 * @param Agencies - Las agencias asociadas a la solicitud. Puede ser un array de cadenas o números.
 * @param Rols - Los roles asociados a la solicitud. Puede ser un array de cadenas o números.
 */
  constructor(
    public Segments: string[] | number[],
    public Regionals: string[] | number[],
    public Agencies: string[] | number[],
    public Rols: string[] | number[],
  ) { }
}
