package com.service.poller.storage.polling;

import com.service.poller.backend_for_frontend.dto.response.polling.PollingResponseDTO;
import com.service.poller.storage.url.Url;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Polling {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int status;
    @OneToOne
    private Url url;
    private Timestamp timestamp;

    public Polling(int status, Url url, Timestamp timestamp) {
        this.status = status;
        this.url = url;
        this.timestamp = timestamp;
    }

    public PollingResponseDTO getResponseDTO() {
        return new PollingResponseDTO(id, status, timestamp);
    }
}
