package com.example.storemanager.Dao;

import com.example.storemanager.Repository.ImageRepository;
import com.example.storemanager.Repository.ProductRepositoryV2;
import com.example.storemanager.model.Images;
import com.example.storemanager.model.ProductV2;
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
public class ProductDaoV2 {
    private final ProductRepositoryV2 productRepository;

    // This is used for first time creation, not for overwriting
    public ProductV2 saveProduct(ProductV2 product, MultipartFile image, String imageName) throws IOException {
        Images myImage = new Images();
        myImage.setId(UUID.randomUUID());
        myImage.setImageName(imageName);
        myImage.setProduct(product);

        List<Images> images = new ArrayList<>();
        images.add(myImage);

        product.setImages(images);

        String directoryPath = "images/" + myImage.getId();
        Path directory = Paths.get(directoryPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        Path filePath = directory.resolve("default.jpg");
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return productRepository.save(product);
    }

    public ProductV2 save(ProductV2 product) {
        return productRepository.save(product);
    }

    public ProductV2 findById(UUID id) {
        return productRepository.findById(id).orElse(null);
    }
}
