package com.example.storemanager.Dao;

import com.example.storemanager.Repository.ImageRepository;
import com.example.storemanager.model.Images;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ImageDao {
    private final ImageRepository imageRepository;

    public byte[] getImageById(UUID id) throws IOException {
        Images image = imageRepository.findById(id).orElse(null);

        if (image == null) {
            return null;
        }

        Path imagePath = Paths.get("images/" + id, image.getImageFileName());
        return Files.readAllBytes(imagePath);
    }
}
