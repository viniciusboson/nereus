package com.oceanus.nereus.service.impl;

import com.oceanus.nereus.service.AccountsService;
import com.oceanus.nereus.domain.Accounts;
import com.oceanus.nereus.repository.AccountsRepository;
import com.oceanus.nereus.service.dto.AccountsDTO;
import com.oceanus.nereus.service.mapper.AccountsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Accounts.
 */
@Service
@Transactional
public class AccountsServiceImpl implements AccountsService{

    private final Logger log = LoggerFactory.getLogger(AccountsServiceImpl.class);

    private final AccountsRepository accountsRepository;

    private final AccountsMapper accountsMapper;

    public AccountsServiceImpl(AccountsRepository accountsRepository, AccountsMapper accountsMapper) {
        this.accountsRepository = accountsRepository;
        this.accountsMapper = accountsMapper;
    }

    /**
     * Save a accounts.
     *
     * @param accountsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AccountsDTO save(AccountsDTO accountsDTO) {
        log.debug("Request to save Accounts : {}", accountsDTO);
        Accounts accounts = accountsMapper.toEntity(accountsDTO);
        accounts = accountsRepository.save(accounts);
        return accountsMapper.toDto(accounts);
    }

    /**
     *  Get all the accounts.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AccountsDTO> findAll() {
        log.debug("Request to get all Accounts");
        return accountsRepository.findAll().stream()
            .map(accountsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one accounts by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AccountsDTO findOne(Long id) {
        log.debug("Request to get Accounts : {}", id);
        Accounts accounts = accountsRepository.findOne(id);
        return accountsMapper.toDto(accounts);
    }

    /**
     *  Delete the  accounts by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Accounts : {}", id);
        accountsRepository.delete(id);
    }
}
