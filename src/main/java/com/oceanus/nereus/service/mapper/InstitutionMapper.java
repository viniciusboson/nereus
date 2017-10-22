package com.oceanus.nereus.service.mapper;

import com.oceanus.nereus.domain.*;
import com.oceanus.nereus.service.dto.InstitutionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Institution and its DTO InstitutionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InstitutionMapper extends EntityMapper<InstitutionDTO, Institution> {

    

    

    default Institution fromId(Long id) {
        if (id == null) {
            return null;
        }
        Institution institution = new Institution();
        institution.setId(id);
        return institution;
    }
}
