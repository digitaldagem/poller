package com.service.poller.service;

import com.service.poller.storage.polling.*;
import com.service.poller.storage.url.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.*;
import java.sql.Timestamp;
import java.util.*;

@Service
public class PollingService implements CommandLineRunner {

    @Autowired
    PollingRepository pollingRepository;
    @Autowired
    UrlRepository urlRepository;
    Timer timer = new Timer();

    public void getRequest(Url url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url.getUrl())).build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            pollingRepository.save(new Polling(response.statusCode(), url, new Timestamp(System.currentTimeMillis())));
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run(String... args) {
        timer.schedule(timerTask, 1, 300000);
    }

    TimerTask timerTask = new TimerTask() {
        @Override
        public void run() {
            for (Url url : urlRepository.findAll()) {
                getRequest(url);
            }
        }
    };
}
