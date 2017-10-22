package com.oceanus.nereus.service.mapper;

import com.oceanus.nereus.domain.*;
import com.oceanus.nereus.service.dto.ChargeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Charge and its DTO ChargeDTO.
 */
@Mapper(componentModel = "spring", uses = {InstitutionMapper.class})
public interface ChargeMapper extends EntityMapper<ChargeDTO, Charge> {

    @Mapping(source = "institution.id", target = "institutionId")
    @Mapping(source = "institution.description", target = "institutionDescription")
    ChargeDTO toDto(Charge charge); 

    @Mapping(source = "institutionId", target = "institution")
    Charge toEntity(ChargeDTO chargeDTO);

    default Charge fromId(Long id) {
        if (id == null) {
            return null;
        }
        Charge charge = new Charge();
        charge.setId(id);
        return charge;
    }
}
