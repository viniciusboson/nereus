package com.oceanus.nereus.service;

import com.oceanus.nereus.service.dto.OperationDTO;
import java.util.List;

/**
 * Service Interface for managing Operation.
 */
public interface OperationService {

    /**
     * Save a operation.
     *
     * @param operationDTO the entity to save
     * @return the persisted entity
     */
    OperationDTO save(OperationDTO operationDTO);

    /**
     *  Get all the operations.
     *
     *  @return the list of entities
     */
    List<OperationDTO> findAll();

    /**
     *  Get the "id" operation.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    OperationDTO findOne(Long id);

    /**
     *  Delete the "id" operation.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
