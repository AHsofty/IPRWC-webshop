package com.example.storemanager.Controller;


import com.example.storemanager.Dao.ProductDaoV2;
import com.example.storemanager.model.ProductV2;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v2/product")
@RequiredArgsConstructor
public class ProductControllerV2 {

    private final ProductDaoV2 productDao;

    @Secured({"SUPERADMIN"})
    @PostMapping(value = "/create")
    private ResponseEntity<?> createProduct(@RequestParam("product") String productStr, @RequestParam("image") MultipartFile imageFile) {
        try {
            ProductV2 product = new ObjectMapper().readValue(productStr, ProductV2.class);
            product.setId(UUID.randomUUID());

            return new ResponseEntity<>(this.productDao.saveProduct(product, imageFile, "main"), HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Product creation failed", HttpStatus.BAD_REQUEST);
        }
    }
}
