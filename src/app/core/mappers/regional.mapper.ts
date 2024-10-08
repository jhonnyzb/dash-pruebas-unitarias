
import { regionalResponseDTO } from "src/app/infrastructure/dto/regionalResponse.dto";
import { RegionalModel } from "../models/Regional.model";

export class RegionalMapper {

  /**
   * Convierte un arreglo de objetos DTO de respuesta regional en un arreglo de modelos de dominio regional.
   *
   * @param dto - Arreglo de objetos DTO de respuesta regional.
   * @returns Arreglo de modelos de dominio regional.
   */
  static fromApiToDomain(dto: regionalResponseDTO[]): RegionalModel[] {

    const regionals: RegionalModel[] = dto.map((item, i) => {
      return {
        RegionalId: item.regionalId,
        ProgramId: item.programId,
        Name: item.name,
        Status: item.status,

      }
    })
    return regionals;
  }
}
