package com.example.storemanager.Controller;


import com.example.storemanager.Dao.ProductDaoV2;
import com.example.storemanager.model.Product;
import com.example.storemanager.model.ProductV2;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
            return new ResponseEntity<>(this.productDao.saveProduct(product, imageFile), HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Product creation failed", HttpStatus.BAD_REQUEST);
        }
    }
}
