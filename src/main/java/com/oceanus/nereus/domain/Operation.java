package com.oceanus.nereus.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Operation.
 */
@Entity
@Table(name = "operation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Operation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Column(name = "from_amount")
    private Double fromAmount;

    @Column(name = "to_amount")
    private Double toAmount;

    @ManyToOne
    private Wallet fromWallet;

    @ManyToOne
    private Institution fromInstitution;

    @ManyToOne
    private Asset fromAsset;

    @ManyToOne
    private Wallet toWallet;

    @ManyToOne
    private Asset toAsset;

    @ManyToOne
    private Institution toInstitution;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public Operation createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public Operation updatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Double getFromAmount() {
        return fromAmount;
    }

    public Operation fromAmount(Double fromAmount) {
        this.fromAmount = fromAmount;
        return this;
    }

    public void setFromAmount(Double fromAmount) {
        this.fromAmount = fromAmount;
    }

    public Double getToAmount() {
        return toAmount;
    }

    public Operation toAmount(Double toAmount) {
        this.toAmount = toAmount;
        return this;
    }

    public void setToAmount(Double toAmount) {
        this.toAmount = toAmount;
    }

    public Wallet getFromWallet() {
        return fromWallet;
    }

    public Operation fromWallet(Wallet wallet) {
        this.fromWallet = wallet;
        return this;
    }

    public void setFromWallet(Wallet wallet) {
        this.fromWallet = wallet;
    }

    public Institution getFromInstitution() {
        return fromInstitution;
    }

    public Operation fromInstitution(Institution institution) {
        this.fromInstitution = institution;
        return this;
    }

    public void setFromInstitution(Institution institution) {
        this.fromInstitution = institution;
    }

    public Asset getFromAsset() {
        return fromAsset;
    }

    public Operation fromAsset(Asset asset) {
        this.fromAsset = asset;
        return this;
    }

    public void setFromAsset(Asset asset) {
        this.fromAsset = asset;
    }

    public Wallet getToWallet() {
        return toWallet;
    }

    public Operation toWallet(Wallet wallet) {
        this.toWallet = wallet;
        return this;
    }

    public void setToWallet(Wallet wallet) {
        this.toWallet = wallet;
    }

    public Asset getToAsset() {
        return toAsset;
    }

    public Operation toAsset(Asset asset) {
        this.toAsset = asset;
        return this;
    }

    public void setToAsset(Asset asset) {
        this.toAsset = asset;
    }

    public Institution getToInstitution() {
        return toInstitution;
    }

    public Operation toInstitution(Institution institution) {
        this.toInstitution = institution;
        return this;
    }

    public void setToInstitution(Institution institution) {
        this.toInstitution = institution;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Operation operation = (Operation) o;
        if (operation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operation{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", fromAmount='" + getFromAmount() + "'" +
            ", toAmount='" + getToAmount() + "'" +
            "}";
    }
}
