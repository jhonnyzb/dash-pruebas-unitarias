
import { affiliateRankingDTO } from "../../infrastructure/dto/rankingResponse.dto";
import { AffiliateRanking } from "../models/UserRanking.model";

export class RankingMapper {

  /**
   * Convierte un objeto DTO de ranking de afiliados en un objeto de dominio de ranking de afiliados.
   *
   * @param dto - El objeto DTO de ranking de afiliados.
   * @returns El objeto de dominio de ranking de afiliados convertido.
   */
  static fromApiToDomain(dto: affiliateRankingDTO): AffiliateRanking {
    return {
      AccountId: dto.accountId,
      TotalPoints: dto.totalPoints,
      RankingLevels: dto.rankingLevels.map((item, _) => {
        return {
          LevelName: item.levelName,
          Ranking: item.ranking
        }
      })
    };
  }

}
