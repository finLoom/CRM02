// backend/src/main/java/com/enterprise/core/common/service/BaseService.java
package com.enterprise.core.common.service;

import com.enterprise.core.common.entity.BaseEntity;
import com.enterprise.core.common.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Base service class that provides common CRUD operations for entities.
 * This can be extended by specific service implementations to avoid code duplication.
 *
 * @param <E> Entity type
 * @param <D> DTO type
 * @param <ID> ID type
 */
public abstract class BaseService<E extends BaseEntity, D, ID> {

    /**
     * Get the JPA repository for the entity
     * @return JPA repository
     */
    protected abstract JpaRepository<E, ID> getRepository();

    /**
     * Get the function to convert entity to DTO
     * @return Entity to DTO mapper function
     */
    protected abstract Function<E, D> getEntityToDtoMapper();

    /**
     * Get the function to convert DTO to entity
     * @return DTO to entity mapper function
     */
    protected abstract Function<D, E> getDtoToEntityMapper();

    /**
     * Get the function to update entity from DTO
     * @return Update function
     */
    protected abstract BiConsumer<D, E> getUpdateEntityFromDto();

    /**
     * Get the entity class
     * @return Entity class
     */
    protected abstract Class<E> getEntityClass();

    /**
     * Get all entities
     * @return List of DTOs
     */
    public List<D> findAll() {
        return getRepository().findAll().stream()
                .map(getEntityToDtoMapper())
                .collect(Collectors.toList());
    }

    /**
     * Get all entities with pagination
     * @param pageable Pagination information
     * @return Page of DTOs
     */
    public Page<D> findAll(Pageable pageable) {
        return getRepository().findAll(pageable)
                .map(getEntityToDtoMapper());
    }

    /**
     * Get entity by ID
     * @param id Entity ID
     * @return DTO
     * @throws ResourceNotFoundException if entity not found
     */
    public D findById(ID id) {
        return getRepository().findById(id)
                .map(getEntityToDtoMapper())
                .orElseThrow(() -> new ResourceNotFoundException(getEntityClass().getSimpleName(), "id", id));
    }

    /**
     * Check if entity exists
     * @param id Entity ID
     * @return true if entity exists, false otherwise
     */
    public boolean existsById(ID id) {
        return getRepository().existsById(id);
    }

    /**
     * Create new entity
     * @param dto DTO to create entity from
     * @return Created DTO
     */
    public D create(D dto) {
        E entity = getDtoToEntityMapper().apply(dto);
        E savedEntity = getRepository().save(entity);
        return getEntityToDtoMapper().apply(savedEntity);
    }

    /**
     * Update existing entity
     * @param id Entity ID
     * @param dto DTO with updated data
     * @return Updated DTO
     * @throws ResourceNotFoundException if entity not found
     */
    public D update(ID id, D dto) {
        E entity = getRepository().findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(getEntityClass().getSimpleName(), "id", id));

        getUpdateEntityFromDto().accept(dto, entity);
        E updatedEntity = getRepository().save(entity);
        return getEntityToDtoMapper().apply(updatedEntity);
    }

    /**
     * Partially update entity (update only non-null fields)
     * @param id Entity ID
     * @param dto DTO with updated data
     * @return Updated DTO
     * @throws ResourceNotFoundException if entity not found
     */
    public D partialUpdate(ID id, D dto) {
        // This should be implemented by subclasses to handle partial updates
        return update(id, dto);
    }

    /**
     * Delete entity
     * @param id Entity ID
     * @throws ResourceNotFoundException if entity not found
     */
    public void delete(ID id) {
        if (!getRepository().existsById(id)) {
            throw new ResourceNotFoundException(getEntityClass().getSimpleName(), "id", id);
        }
        getRepository().deleteById(id);
    }

    /**
     * Get entity by ID and map to custom type
     * @param id Entity ID
     * @param mapper Mapper function
     * @return Mapped object
     * @throws ResourceNotFoundException if entity not found
     */
    public <T> T findByIdAndMap(ID id, Function<E, T> mapper) {
        return getRepository().findById(id)
                .map(mapper)
                .orElseThrow(() -> new ResourceNotFoundException(getEntityClass().getSimpleName(), "id", id));
    }

    /**
     * Find entity by ID as optional
     * @param id Entity ID
     * @return Optional of entity
     */
    protected Optional<E> findEntityById(ID id) {
        return getRepository().findById(id);
    }
}