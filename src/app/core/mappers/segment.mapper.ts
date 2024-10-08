
import { segmentResponseDTO } from "src/app/infrastructure/dto/segmentResponse.dto";
import { SegmentsModel } from "../models/Segments.model";

export class SegmentMapper {

  /**
   * Convierte un arreglo de objetos DTO de segmento en un arreglo de modelos de segmento.
   *
   * @param dto - Arreglo de objetos DTO de segmento.
   * @returns Arreglo de modelos de segmento.
   */
  static fromApiToDomain(dto: segmentResponseDTO[]): SegmentsModel[] {

    const segments: SegmentsModel[] = dto.map((item, i) => {
      return {
        ClusterId: item.clusterId,
        ProgramId: item.programId,
        Name: item.name,
        PointValue: item.pointValue,
        Active: item.active,

      }
    })
    return segments;
  }
}
