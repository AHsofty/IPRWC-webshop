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

    public Product updateProduct(Product product, MultipartFile imageFile, String main) throws IOException {
        // Check if the product exists in the database
        Product existingProduct = productRepository.findById(product.getId()).orElse(null);

        if (existingProduct == null) {
            throw new IllegalArgumentException("Product not found");
        }

        // Update the image, we do this by deleting the old image and creating a new one
        if (!existingProduct.getImages().isEmpty()) {
            Images oldImage = existingProduct.getImages().get(0); // This is hardcoding, but it's fine for now
            Path oldImagePath = Paths.get("images/" + oldImage.getId(), oldImage.getImageFileName());
            Files.deleteIfExists(oldImagePath);
        }

        // Create a new image
        Images newImage = new Images();
        newImage.setId(existingProduct.getImages().get(0).getId()); // This is hardcoding, but it's fine for now
        newImage.setImageName(main);
        newImage.setProduct(existingProduct);
        newImage.setImageFileName("default.jpg");
        product.setImages(List.of(newImage));

        // Save the new image
        String directoryPath = "images/" + newImage.getId();
        Path directory = Paths.get(directoryPath);

        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }

        Path filePath = directory.resolve(newImage.getImageFileName());
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return productRepository.save(product);
    }

    public void removeProduct(Product product) {
        productRepository.delete(product);
    }
}
