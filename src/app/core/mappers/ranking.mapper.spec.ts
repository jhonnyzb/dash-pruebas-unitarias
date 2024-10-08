import { RankingMapper } from './ranking.mapper';
import { affiliateRankingDTO } from '../../infrastructure/dto/rankingResponse.dto';
import { AffiliateRanking } from '../models/UserRanking.model';

describe('RankingMapper', () => {

  it('should correctly map affiliateRankingDTO to AffiliateRanking', () => {
    const mockDto: affiliateRankingDTO = {
      accountId: 1,
      totalPoints: 1500,
      rankingLevels: [
        {
          levelName: 'Nivel 1',
          ranking: 5
        },
        {
          levelName: 'Nivel 2',
          ranking: 10
        }
      ]
    };

   
    const expectedModel: AffiliateRanking = {
      AccountId: 1,
      TotalPoints: 1500,
      RankingLevels: [
        {
          LevelName: 'Nivel 1',
          Ranking: 5
        },
        {
          LevelName: 'Nivel 2',
          Ranking: 10
        }
      ]
    };

    const result = RankingMapper.fromApiToDomain(mockDto);

    expect(result).toEqual(expectedModel);
  });
});
