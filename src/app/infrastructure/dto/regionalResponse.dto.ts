/**
 * Interfaz que representa la respuesta de una región.
 * @param regionalId - El ID de la región.
 * @param programId - El ID del programa.
 * @param name - El nombre de la región.
 * @param status - El estado de la región.
 */
export interface regionalResponseDTO {
  regionalId: number;
  programId: number;
  name: string;
  status: boolean;
}

