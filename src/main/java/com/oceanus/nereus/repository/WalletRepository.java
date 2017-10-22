package com.oceanus.nereus.repository;

import com.oceanus.nereus.domain.Wallet;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Wallet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    @Query("select distinct wallet from Wallet wallet left join fetch wallet.assets left join fetch wallet.institutions")
    List<Wallet> findAllWithEagerRelationships();

    @Query("select wallet from Wallet wallet left join fetch wallet.assets left join fetch wallet.institutions where wallet.id =:id")
    Wallet findOneWithEagerRelationships(@Param("id") Long id);

}
