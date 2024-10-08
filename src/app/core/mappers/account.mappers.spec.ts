import { AccountMapper } from './account.mapper';
import { infoCountResponseDTO } from 'src/app/infrastructure/dto/infoCountResponse.dto';
import { InfoCountAfiliateFinallyModel } from '../models/InfoCountAfiliateFinally.model';

describe('AccountMapper', () => {

  it('should correctly map fromApiToDomain', () => {
    const mockDto: infoCountResponseDTO = {
      dataUser: {
        accountId: 123,
        segment: 'Segmento 1',
        agency: 'Agencia 1',
        regional: ['Regional 1']
      }
    };
    const expectedModel: InfoCountAfiliateFinallyModel = {
      dataUser: {
        AccountId: 123,
        Segment: 'Segmento 1',
        Agency: 'Agencia 1',
        Regional: ['Regional 1']
      }
    };

    const result = AccountMapper.fromApiToDomain(mockDto);
    expect(result).toEqual(expectedModel);
  });
});
