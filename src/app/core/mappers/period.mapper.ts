
import { periodResponseDTO } from "src/app/infrastructure/dto/periodResponse.dto";
import { PeriodsModel } from "../models/Periods.model";

export class PeriodMapper {

  /**
   * Convierte un arreglo de objetos DTO de respuesta de periodo en un arreglo de objetos de modelo de periodos.
   *
   * @param dto - Arreglo de objetos DTO de respuesta de periodo.
   * @returns Arreglo de objetos de modelo de periodos.
   */
  static fromApiToDomain(dto: periodResponseDTO[]): PeriodsModel[] {

    const periods: PeriodsModel[] = dto.map((item, i) => {
      return {
        PeriodId: item.periodId,
        ProgramId: item.programId,
        Name: item.name,
        Status: item.status,
        DateFinal: item.dateFinal,
        DateInitial: item.dateInitial,
        ExpirationDate: item.expirationDate
      }
    })
    return periods;
  }
}
