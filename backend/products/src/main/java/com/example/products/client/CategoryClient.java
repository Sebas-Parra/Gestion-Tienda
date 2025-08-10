package com.example.products.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
public class CategoryClient {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${categories.service.url}")
    private String categoriesBaseUrl;

    public boolean exists(Long categoryId) {
        try {
            ResponseEntity<Void> resp = restTemplate.getForEntity(
                    categoriesBaseUrl + "/" + categoryId, Void.class);
            return resp.getStatusCode().is2xxSuccessful();
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }
}
