package com.example.storemanager.Dao;

import com.example.storemanager.Repository.ProductRepositoryV2;
import com.example.storemanager.model.ProductV2;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductDaoV2 {
    private final ProductRepositoryV2 productRepository;

    public ProductV2 saveProduct(ProductV2 product, MultipartFile image) throws IOException {
        product.setId(UUID.randomUUID());
        String directoryPath = "images/" + product.getId();
        Path directory = Paths.get(directoryPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        Path filePath = directory.resolve(image.getOriginalFilename());
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        product.setImagePath(filePath.toString());
        return productRepository.save(product);
    }

    public ProductV2 findById(UUID id) {
        return productRepository.findById(id).orElse(null);
    }
}
