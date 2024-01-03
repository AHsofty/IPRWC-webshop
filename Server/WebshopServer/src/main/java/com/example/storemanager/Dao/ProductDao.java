package com.example.storemanager.Dao;

import com.example.storemanager.Repository.ProductRepository;
import com.example.storemanager.model.Images;
import com.example.storemanager.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductDao {
    private final ProductRepository productRepository;

    // This is used for first time creation, not for overwriting
    public Product saveProduct(Product product, MultipartFile image, String imageName) throws IOException {
        Images myImage = new Images();
        myImage.setId(UUID.randomUUID());
        myImage.setImageName(imageName);
        myImage.setProduct(product);
        myImage.setImageFileName("default.jpg");

        List<Images> images = new ArrayList<>();
        images.add(myImage);

        product.setImages(images);

        String directoryPath = "images/" + myImage.getId();
        Path directory = Paths.get(directoryPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        Path filePath = directory.resolve(myImage.getImageFileName());
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return productRepository.save(product);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Product findById(UUID id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<Product> findAll() {
        try {
            return this.productRepository.findAll();
        }
        catch (Exception ignored) {}

        return new ArrayList<>();
    }
}
