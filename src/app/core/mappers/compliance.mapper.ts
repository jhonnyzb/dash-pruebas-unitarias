import { CompliancesModel } from "../models/Compliances.model";
import { compliancesResponseDTO } from "src/app/infrastructure/dto/complianceResponse.dto";

export class ComplianceMapper {

  /**
   * Convierte un objeto DTO de respuesta de cumplimientos en un modelo de cumplimientos.
   *
   * @param dto - El objeto DTO de respuesta de cumplimientos.
   * @returns El modelo de cumplimientos convertido.
   */
  static fromApiToDomain(dto: compliancesResponseDTO): CompliancesModel {
    return {
      CumplimientosInfo: dto.cumplimientosInfo.map((item, _) => {
        return {
          Indicator: item.variable,
          Finishline: item.target,
          Compliance: item.compliance,
          Points: item.points
        }
      })
    }
  }

}
