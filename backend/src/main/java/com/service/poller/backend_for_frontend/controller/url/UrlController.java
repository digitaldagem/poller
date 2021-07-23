package com.service.poller.backend_for_frontend.controller.url;

import com.service.poller.backend_for_frontend.dto.request.url.UrlRequestDTO;
import com.service.poller.backend_for_frontend.dto.response.url.*;
import com.service.poller.service.PollingService;
import com.service.poller.storage.polling.*;
import com.service.poller.storage.url.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/urls")
public class UrlController {

    @Autowired
    UrlRepository urlRepository;
    @Autowired
    PollingRepository pollingRepository;
    @Autowired
    PollingService pollingService;

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteURL(@PathVariable("id") Long id) {
        if(urlRepository.findById(id).isPresent()){
            Url url = urlRepository.findById(id).get();
            for (Polling polling : pollingRepository.findAll()) {
                if(polling.getUrl() == url) {
                    pollingRepository.delete(polling);
                }
            }
            urlRepository.deleteById(id);
            return ResponseEntity.ok("data object has been deleted.");
        }
        return ResponseEntity.ok("data object not found.");
    }

    @GetMapping
    public List<UrlNameResponseDTO> getAllUrlsByName() {
        return urlRepository.findAll().stream().map(Url::getByNameResponseDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getURL(@PathVariable("id") Long id) {
        if(urlRepository.findById(id).isPresent()){
            return ResponseEntity.ok(
                    urlRepository.findById(id).get().getResponseDTO()
            );
        }
        return ResponseEntity.badRequest().body("data object not found.");
    }

    @PostMapping
    public UrlResponseDTO postURL(@RequestBody UrlRequestDTO urlRequestDTO) {
        Url url = urlRepository.save(
                new Url(
                        urlRequestDTO.getUrl(),
                        urlRequestDTO.getName()
                )
        );
        pollingService.getRequest(url);
        return url.getResponseDTO();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateURL(@PathVariable("id") Long id, @RequestBody UrlRequestDTO urlRequestDTO) {
        if(urlRepository.findById(id).isPresent()){
            Url url = urlRepository.findById(id).get();
            url.setUrl(urlRequestDTO.getUrl());
            url.setName(urlRequestDTO.getName());
            url.getDatesUpdated().add(new Timestamp(System.currentTimeMillis()));
            return ResponseEntity.ok(urlRepository.save(url).getResponseDTO());
        }
        return ResponseEntity.ok("data object not found.");
    }
}
