import { SelectorResponseDTO, SelectorResponseDTO1, SelectorResponseFDTO1 } from '../../infrastructure/dto/selectorResponse.dto';
import { SelectorResponseModel, SelectorResponseModel1, SelectorResponseModelFinally } from '../models/selectorResponse.model';

export class SelectorMapper {

  /**
   * Convierte un objeto DTO de respuesta de selector en un modelo de respuesta de selector.
   *
   * @param dto - El objeto DTO de respuesta de selector.
   * @returns El modelo de respuesta de selector.
   */
  static fromApiToDomain(dto: SelectorResponseDTO): SelectorResponseModel {
    const selectors = {
      Segments: dto.Segments,
      Regionals: dto.Regional,
      Agencies: dto.Agency,
      Rols: dto.Role
    }
    return { selectors };
  }

  /**
   * Convierte un objeto DTO de respuesta de selector a un modelo de respuesta de selector del dominio.
   *
   * @param dto - El objeto DTO de respuesta de selector.
   * @returns El modelo de respuesta de selector del dominio.
   */
  static fromApiToDomain1(dto: SelectorResponseDTO1): SelectorResponseModel1 {
    const selectors = dto.data.data
    return { selectors };
  }

  /**
   * Convierte un objeto DTO de respuesta de API a un objeto de dominio de respuesta de selector.
   *
   * @param dto - El objeto DTO de respuesta de API a convertir.
   * @returns El objeto de dominio de respuesta de selector convertido.
   */
  static fromApiToDomainFinally(dto: SelectorResponseFDTO1): SelectorResponseModelFinally {
    const filters = dto.filters
    return { filters };
  }


}
