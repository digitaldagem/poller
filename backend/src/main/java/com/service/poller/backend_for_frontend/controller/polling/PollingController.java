package com.service.poller.backend_for_frontend.controller.polling;

import com.service.poller.backend_for_frontend.dto.response.polling.PollingWithUrlResponseDTO;
import com.service.poller.storage.polling.*;
import com.service.poller.storage.url.UrlRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/pollings")
public class PollingController {

    @Autowired
    PollingRepository pollingRepository;
    @Autowired
    UrlRepository urlRepository;

    @GetMapping("/{urlName}")
    public ResponseEntity<?> getAllPollings(@PathVariable("urlName") String urlName) {
        if(urlRepository.findByName(urlName).isPresent()) {
            return ResponseEntity.ok(
                    new PollingWithUrlResponseDTO(
                            urlRepository.findByName(urlName).get().getUrl(),
                            pollingRepository.findAll()
                                    .stream()
                                    .filter(polling -> polling.getUrl().getName().equals(urlName))
                                    .map(Polling::getResponseDTO)
                                    .collect(Collectors.toList())
                    )
            );
        }
        return ResponseEntity.badRequest().body("data object not found.");
    }
}
