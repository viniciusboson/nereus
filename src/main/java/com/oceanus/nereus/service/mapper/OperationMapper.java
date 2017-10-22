package com.oceanus.nereus.service.mapper;

import com.oceanus.nereus.domain.*;
import com.oceanus.nereus.service.dto.OperationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Operation and its DTO OperationDTO.
 */
@Mapper(componentModel = "spring", uses = {WalletMapper.class, InstitutionMapper.class, AssetMapper.class})
public interface OperationMapper extends EntityMapper<OperationDTO, Operation> {

    @Mapping(source = "fromWallet.id", target = "fromWalletId")
    @Mapping(source = "fromWallet.description", target = "fromWalletDescription")
    @Mapping(source = "fromInstitution.id", target = "fromInstitutionId")
    @Mapping(source = "fromInstitution.description", target = "fromInstitutionDescription")
    @Mapping(source = "fromAsset.id", target = "fromAssetId")
    @Mapping(source = "fromAsset.code", target = "fromAssetCode")
    @Mapping(source = "toWallet.id", target = "toWalletId")
    @Mapping(source = "toWallet.description", target = "toWalletDescription")
    @Mapping(source = "toAsset.id", target = "toAssetId")
    @Mapping(source = "toAsset.code", target = "toAssetCode")
    @Mapping(source = "toInstitution.id", target = "toInstitutionId")
    @Mapping(source = "toInstitution.description", target = "toInstitutionDescription")
    OperationDTO toDto(Operation operation); 

    @Mapping(source = "fromWalletId", target = "fromWallet")
    @Mapping(source = "fromInstitutionId", target = "fromInstitution")
    @Mapping(source = "fromAssetId", target = "fromAsset")
    @Mapping(source = "toWalletId", target = "toWallet")
    @Mapping(source = "toAssetId", target = "toAsset")
    @Mapping(source = "toInstitutionId", target = "toInstitution")
    Operation toEntity(OperationDTO operationDTO);

    default Operation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Operation operation = new Operation();
        operation.setId(id);
        return operation;
    }
}
