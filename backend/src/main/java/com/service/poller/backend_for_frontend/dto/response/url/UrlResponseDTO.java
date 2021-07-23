package com.service.poller.backend_for_frontend.dto.response.url;

import lombok.Value;

import java.sql.Timestamp;
import java.util.List;

@Value
public class UrlResponseDTO {
    Long id;
    String url;
    String name;
    Timestamp dateAdded;
    List<Timestamp> datesUpdated;
}
