/**
 * Interfaz que representa la información de un ranking.
 * @param levelName - El nombre del nivel.
 * @param ranking - El número de ranking.
 */
export interface rankingInfoDTO {
  levelName: string;
  ranking: number;
}

/**
 * Interfaz que representa los datos de clasificación de un afiliado.
 * @param accountId - El ID de la cuenta del afiliado.
 * @param totalPoints - El total de puntos del afiliado.
 * @param rankingLevels - La información de clasificación del afiliado.
 */
export interface affiliateRankingDTO {
  accountId: number;
  totalPoints: number;
  rankingLevels: rankingInfoDTO[];
}

