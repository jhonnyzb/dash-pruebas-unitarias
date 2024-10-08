import { IndicatorResponseDTO } from "../../infrastructure/dto/indicatorResponse.dto";
import { CompliancesModel } from "../models/Compliances.model";
import { IndicatorResponseModel } from "../models/IndicatorResponse.model";

export class IndicatorMapper {

  /**
   * Convierte un objeto DTO de respuesta de indicador en un modelo de cumplimientos.
   *
   * @param dto - El objeto DTO de respuesta de indicador.
   * @returns El modelo de cumplimientos convertido.
   */
  static fromApiToDomain(dto: IndicatorResponseDTO): CompliancesModel {
    return {
      dateUpload: dto.data[0].upload_Date,
      CumplimientosInfo: dto.data.map((item, index) => {
        return {
          Indicator: item.compliances[0].variable,
          Finishline: item.compliances[0].target,
          Compliance: item.compliances[0].compliance,
          Points: item.compliances[0].pointsEarned,
          ProgramId: item.compliances[0].programId,
          Identification: item.compliances[0].identification,
          Role: item.compliances[0].role,
          Regional: item.compliances[0].regional,
          Agency: item.compliances[0].agency,
          Segment: item.compliances[0].segment,
          RankinCountry: item.compliances[0].rankinCountry,
          RankinAgency: item.compliances[0].rankinAgency,
          RankinRegion: item.compliances[0].rankinRegion,
        }
      })
    };
  }


}
