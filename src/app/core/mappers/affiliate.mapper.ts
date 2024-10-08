import { AffiliateDTO } from "src/app/infrastructure/dto/affiliateResponse.dto";
import { AffiliateModel } from "../models/UserAffiliate.model";

export class AffiliateMapper {

  /**
   * Convierte un objeto DTO de afiliado en un modelo de afiliado.
   *
   * @param dto El objeto DTO de afiliado.
   * @returns El modelo de afiliado convertido.
   */
  static fromApiToDomain(dto: AffiliateDTO): AffiliateModel {
    return {
      dataUser: {
        idCuenta: dto.dataUser.idCuenta,
        occupation: dto.dataUser.cargo,
        segment: dto.dataUser.segmento,
        agency: dto.dataUser.agencia,
        regional: dto.dataUser.regional
      },
      cumplimientosInfo: dto.cumplimientosInfo.map((item, _) => {
        return {
          indicator: item.variable,
          finishline: item.meta,
          compliance: item.cumplimiento,
          points: item.puntos
        }
      })
    }
  }

}
