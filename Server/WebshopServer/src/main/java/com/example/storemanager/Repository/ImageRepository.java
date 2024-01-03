package com.example.storemanager.Repository;

import com.example.storemanager.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ImageRepository extends JpaRepository<Images, UUID> {
}
