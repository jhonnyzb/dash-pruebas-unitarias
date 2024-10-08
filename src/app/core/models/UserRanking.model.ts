
export class UserRanking {
  /**
 * Clase que representa el ranking de un usuario.
 *
 * @param LevelName - El nombre del nivel del usuario.
 * @param Ranking - El ranking del usuario.
 */
  constructor(
    public LevelName: string,
    public Ranking: number,
  ) { }
}



export class AffiliateRanking {
  /**
* Clase que representa el ranking de un afiliado.
*
* @param AccountId - El ID de la cuenta del afiliado.
* @param TotalPoints - El total de puntos del afiliado.
* @param RankingLevels - Los niveles de ranking del afiliado.
*/
  constructor(
    public AccountId: number,
    public TotalPoints: number,
    public RankingLevels: UserRanking[],

  ) { }
}
