package com.example.storemanager.Controller;

import com.example.storemanager.Dao.ProductDao;
import com.example.storemanager.model.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    // TODO: MAKE USE OF DTOS AND MAPPERS ETC

    private final ProductDao productDao;

    @PostMapping(value = "/create")
    private ResponseEntity<?> createProduct(@RequestParam("product") String productStr, @RequestParam("image") MultipartFile imageFile) {
        try {
            Product product = new ObjectMapper().readValue(productStr, Product.class);
            product.setImage(imageFile.getBytes());
            return new ResponseEntity<>(this.productDao.createProduct(product), HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Product creation failed", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/all")
    private List<Product> getAllProducts() {
        return this.productDao.getAllProducts();
    }

    @GetMapping(value = "/{id}")
    private Product getProductById(@PathVariable("id") String id) {
        return this.productDao.getProductById(id);
    }

    @PostMapping(value = "/remove/{id}")
    public ResponseEntity<String> removeProductById(@PathVariable("id") String id, @RequestParam String amount) {
            return this.productDao.removeProductById(id, amount);

    }

    @PatchMapping(value = "/update/{id}")
    public ResponseEntity<String> updateProductById(@PathVariable("id") String id, @RequestParam("product") Optional<String> productStr, @RequestParam("image") Optional<MultipartFile> imageFile) {
        try {
            Product product = new Product();
            if (productStr.isPresent()) {
                product = new ObjectMapper().readValue(productStr.get(), Product.class);
                Product oldProduct = this.productDao.getProductById(id);

                // I am not sure if this is the correct way of handling this
                if (product.getProductName() == null) {
                    product.setProductName(oldProduct.getProductName());
                }
                if (product.getBuyPrice() == 0) {
                    product.setBuyPrice(oldProduct.getBuyPrice());
                }
                if (product.getSellPrice() == 0) {
                    product.setSellPrice(oldProduct.getSellPrice());
                }
                if (product.getQuantity() == 0) {
                    product.setQuantity(oldProduct.getQuantity());
                }
                if (product.getDescription() == null) {
                    product.setDescription(oldProduct.getDescription());
                }
                if (imageFile.isEmpty()) {
                    product.setImage(oldProduct.getImage());
                }
            }

            product.setId(UUID.fromString(id));

            return this.productDao.updateProductById(product);

        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }

        return new ResponseEntity<>("Product update failed", HttpStatus.BAD_REQUEST);

    }

    @PostMapping(value = "/add/{id}")
    public ResponseEntity<String> addProductById(@PathVariable("id") String id, @RequestParam String amount) {
            return this.productDao.addProductById(id, amount);

    }
}
