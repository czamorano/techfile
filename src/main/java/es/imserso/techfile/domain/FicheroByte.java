package es.imserso.techfile.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FicheroByte.
 */
@Entity
@Table(name = "fichero_byte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FicheroByte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "file_bytes")
    private byte[] fileBytes;

    @Column(name = "file_bytes_content_type")
    private String fileBytesContentType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFileBytes() {
        return fileBytes;
    }

    public FicheroByte fileBytes(byte[] fileBytes) {
        this.fileBytes = fileBytes;
        return this;
    }

    public void setFileBytes(byte[] fileBytes) {
        this.fileBytes = fileBytes;
    }

    public String getFileBytesContentType() {
        return fileBytesContentType;
    }

    public FicheroByte fileBytesContentType(String fileBytesContentType) {
        this.fileBytesContentType = fileBytesContentType;
        return this;
    }

    public void setFileBytesContentType(String fileBytesContentType) {
        this.fileBytesContentType = fileBytesContentType;
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
        FicheroByte ficheroByte = (FicheroByte) o;
        if (ficheroByte.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheroByte.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheroByte{" +
            "id=" + getId() +
            ", fileBytes='" + getFileBytes() + "'" +
            ", fileBytesContentType='" + getFileBytesContentType() + "'" +
            "}";
    }
}
