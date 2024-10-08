
import { infoCountResponseDTO } from "src/app/infrastructure/dto/infoCountResponse.dto";
import { InfoCountAfiliateFinallyModel } from "../models/InfoCountAfiliateFinally.model";

export class AccountMapper {

  /**
   * Convierte un objeto DTO de respuesta de información de cuenta en un objeto del modelo de cuenta final de afiliado.
   *
   * @param dto - El objeto DTO de respuesta de información de cuenta.
   * @returns El objeto del modelo de cuenta final de afiliado.
   */
  static fromApiToDomain(dto: infoCountResponseDTO): InfoCountAfiliateFinallyModel {

    return {
      dataUser: {
        AccountId: dto.dataUser.accountId,
        Segment: dto.dataUser.segment,
        Agency: dto.dataUser.agency,
        Regional: dto.dataUser.regional
      },

    }
  }
}
