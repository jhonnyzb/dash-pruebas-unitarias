/**
 * Interfaz que representa la respuesta de un período.
 *
 * @param periodId - El ID del período.
 * @param programId - El ID del programa.
 * @param name - El nombre del período.
 * @param status - El estado del período.
 * @param dateInitial - La fecha de inicio del período.
 * @param dateFinal - La fecha de finalización del período.
 * @param expirationDate - La fecha de vencimiento del período.
 */
export interface periodResponseDTO {
  periodId: number;
  programId: number;
  name: string;
  status: boolean;
  dateInitial: string;
  dateFinal: string;
  expirationDate: string
}

