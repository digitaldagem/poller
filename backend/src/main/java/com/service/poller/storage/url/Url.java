package com.service.poller.storage.url;

import com.service.poller.backend_for_frontend.dto.response.url.*;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;
    private String name;
    private Timestamp dateAdded;
    @ElementCollection
    private List<Timestamp> datesUpdated;

    public Url(String url, String name) {
        this.url = url;
        this.name = name;
        this.dateAdded = new Timestamp(System.currentTimeMillis());
    }

    public UrlResponseDTO getResponseDTO() {
        return new UrlResponseDTO(id, url, name, dateAdded, datesUpdated);
    }
    public UrlNameResponseDTO getByNameResponseDTO() {
        return new UrlNameResponseDTO(id, name);
    }
}
