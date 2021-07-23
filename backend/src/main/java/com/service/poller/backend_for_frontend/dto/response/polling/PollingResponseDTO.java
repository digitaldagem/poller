package com.service.poller.backend_for_frontend.dto.response.polling;

import lombok.Value;

import java.sql.Timestamp;

@Value
public class PollingResponseDTO {
    Long id;
    int status;
    Timestamp timestamp;
}
