package es.imserso.techfile.service.mapper;

import es.imserso.techfile.domain.*;
import es.imserso.techfile.service.dto.FicheroByteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity FicheroByte and its DTO FicheroByteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FicheroByteMapper extends EntityMapper<FicheroByteDTO, FicheroByte> {



    default FicheroByte fromId(Long id) {
        if (id == null) {
            return null;
        }
        FicheroByte ficheroByte = new FicheroByte();
        ficheroByte.setId(id);
        return ficheroByte;
    }
}
