package com.service.poller.backend_for_frontend.dto.response.polling;

import lombok.Value;

import java.util.List;

@Value
public class PollingWithUrlResponseDTO {
    String url;
    List<PollingResponseDTO> pollingResponseDTOList;
}
