package com.example.storemanager.Repository;

import com.example.storemanager.model.ProductV2;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepositoryV2 extends JpaRepository<ProductV2, UUID> {
    // Custom database queries if needed
}
