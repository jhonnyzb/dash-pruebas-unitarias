import { PeriodMapper } from './period.mapper';
import { periodResponseDTO } from 'src/app/infrastructure/dto/periodResponse.dto';
import { PeriodsModel } from '../models/Periods.model';

describe('PeriodMapper', () => {

  it('should correctly map an array of periodResponseDTO to PeriodsModel', () => {
    const mockDto: periodResponseDTO[] = [
      {
        periodId: 1,
        programId: 101,
        name: 'Periodo 1',
        status: true,
        dateFinal: '2023-12-31',
        dateInitial: '2023-01-01',
        expirationDate: '2024-01-15'
      },
      {
        periodId: 2,
        programId: 102,
        name: 'Periodo 2',
        status: false,
        dateFinal: '2022-12-31',
        dateInitial: '2022-01-01',
        expirationDate: '2023-01-15'
      }
    ];

    const expectedModels: PeriodsModel[] = [
      {
        PeriodId: 1,
        ProgramId: 101,
        Name: 'Periodo 1',
        Status: true,
        DateFinal: '2023-12-31',
        DateInitial: '2023-01-01',
        ExpirationDate: '2024-01-15'
      },
      {
        PeriodId: 2,
        ProgramId: 102,
        Name: 'Periodo 2',
        Status: false,
        DateFinal: '2022-12-31',
        DateInitial: '2022-01-01',
        ExpirationDate: '2023-01-15'
      }
    ];

    const result = PeriodMapper.fromApiToDomain(mockDto);

    expect(result).toEqual(expectedModels);
  });
});
