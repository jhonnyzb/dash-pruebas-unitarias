
export class UploadtypeOfCashRequestModel {
  /**
 * Clase que representa el modelo de solicitud para subir un tipo de efectivo.
 * @class
 */
  constructor(
    public TypeOfCash: number,
    public File: FileRequestModel,
  ) { }
}


export class FileRequestModel {
  /**
 * Clase que representa un modelo de solicitud de archivo.
 *
 * @param {string} Name - El nombre del archivo.
 * @param {string} Extension - La extensión del archivo.
 * @param {string} Data - Los datos del archivo.
 */
  constructor(
    public Name: string,
    public Extension: string,
    public Data: string
  ) { }
}


export class UploadFileResponseModel {
  /**
 * Modelo de respuesta para la carga de archivos.
 *
 * @param RedemptionProcessId - El ID del proceso de redención.
 */
  constructor(
    public RedemptionProcessId: number,
  ) { }
}
