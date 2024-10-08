/**
 * Interfaz que representa la respuesta de un segmento.
 *
 * @param clusterId - El ID del clúster.
 * @param programId - El ID del programa.
 * @param name - El nombre del segmento.
 * @param pointValue - El valor del punto.
 * @param active - Indica si el segmento está activo o no.
 */
export interface segmentResponseDTO {
  clusterId: number;
  programId: number;
  name: string;
  pointValue: number;
  active: boolean;
}

