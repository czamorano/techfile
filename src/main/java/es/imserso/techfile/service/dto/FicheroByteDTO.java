package es.imserso.techfile.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the FicheroByte entity.
 */
public class FicheroByteDTO implements Serializable {

    private Long id;

    @Lob
    private byte[] fileBytes;
    private String fileBytesContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFileBytes() {
        return fileBytes;
    }

    public void setFileBytes(byte[] fileBytes) {
        this.fileBytes = fileBytes;
    }

    public String getFileBytesContentType() {
        return fileBytesContentType;
    }

    public void setFileBytesContentType(String fileBytesContentType) {
        this.fileBytesContentType = fileBytesContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FicheroByteDTO ficheroByteDTO = (FicheroByteDTO) o;
        if (ficheroByteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ficheroByteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FicheroByteDTO{" +
            "id=" + getId() +
            ", fileBytes='" + getFileBytes() + "'" +
            "}";
    }
}
