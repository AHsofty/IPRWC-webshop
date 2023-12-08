package com.example.storemanager.Dao;

import com.example.storemanager.Repository.ProductRepository;
import com.example.storemanager.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductDao {
    private final ProductRepository productRepository;

    public ResponseEntity<String> createProduct(Product product) {
        try {
            this.productRepository.save(product);
            return new ResponseEntity<>("Product created successfully", HttpStatus.CREATED);
        }
        catch (Exception ignored) {}

        return new ResponseEntity<>("Product creation failed", HttpStatus.BAD_REQUEST);
    }

    public ArrayList<Product> getAllProducts() {
        try {
            return (ArrayList<Product>) this.productRepository.findAll();
        }
        catch (Exception ignored) {}

        return new ArrayList<>();
    }

    public Product getProductById(String id) {
        try {
            return this.productRepository.findById(UUID.fromString(id)).orElse(null);
        }
        catch (Exception ignored) {}

        return null;
    }

    public ResponseEntity<String> removeProductById(String id, String amount) {
        Product product = this.getProductById(id);
        int amountToRemove = Integer.parseInt(amount);
        int productAmount = product.getQuantity();

        if (amountToRemove > productAmount || amountToRemove < 0) {
            return new ResponseEntity<>("Failed to remove items", HttpStatus.BAD_REQUEST);
        }
        else if (productAmount == amountToRemove) {
            this.productRepository.deleteById(UUID.fromString(id));
            return new ResponseEntity<>("Product removed successfully", HttpStatus.OK);
        }
        else {
            product.setQuantity(productAmount - amountToRemove);
            this.productRepository.save(product);
            return new ResponseEntity<>("Product updates succesfully", HttpStatus.OK);
        }
    }

    public ResponseEntity<String> addProductById(String id, String amount) {
        Product product = this.getProductById(id);
        int amountToAdd = Integer.parseInt(amount);
        int productAmount = product.getQuantity();

        if (amountToAdd < 0) {
            return new ResponseEntity<>("Failed to add items", HttpStatus.BAD_REQUEST);
        }
        else {
            product.setQuantity(productAmount + amountToAdd);
            this.productRepository.save(product);
            return new ResponseEntity<>("Product updates succesfully", HttpStatus.OK);
        }
    }

    public ResponseEntity<String> updateProductById(Product product) {
        try {
            this.productRepository.save(product);
            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        }
        catch (Exception exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>("Product update failed", HttpStatus.BAD_REQUEST);
        }
    }

}
