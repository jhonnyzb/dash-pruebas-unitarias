import { agenciesResponseDTO } from "src/app/infrastructure/dto/agenciesResponse.dto";
import { AgenciesModel } from "../models/Agencies.model";

export class AgenciesMapper {

  /**
   * Convierte un arreglo de objetos DTO de agencias en un arreglo de modelos de agencias.
   *
   * @param dto - Arreglo de objetos DTO de agencias.
   * @returns Un arreglo de modelos de agencias.
   */
  static fromApiToDomain(dto: agenciesResponseDTO[]): AgenciesModel[] {

    const agencies: AgenciesModel[] = dto.map((item, i) => {
      return {
        AgencyId: item.agencyId,
        Name: item.name
      }
    })
    return agencies;
  }
}
