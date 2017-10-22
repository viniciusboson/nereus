package com.oceanus.nereus.service.mapper;

import com.oceanus.nereus.domain.*;
import com.oceanus.nereus.service.dto.WalletDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Wallet and its DTO WalletDTO.
 */
@Mapper(componentModel = "spring", uses = {AccountsMapper.class, AssetMapper.class, InstitutionMapper.class})
public interface WalletMapper extends EntityMapper<WalletDTO, Wallet> {

    @Mapping(source = "account.id", target = "accountId")
    @Mapping(source = "account.description", target = "accountDescription")
    WalletDTO toDto(Wallet wallet); 

    @Mapping(source = "accountId", target = "account")
    Wallet toEntity(WalletDTO walletDTO);

    default Wallet fromId(Long id) {
        if (id == null) {
            return null;
        }
        Wallet wallet = new Wallet();
        wallet.setId(id);
        return wallet;
    }
}
