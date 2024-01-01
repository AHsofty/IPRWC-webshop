package com.example.storemanager.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productsV2")
public class ProductV2 {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String productName;
    private float buyPrice;
    private float sellPrice;
    private int quantity;
    private String description;

    private String imagePath;
    public String getImageUrl() {
        return imagePath != null ? "/products/images/" + id : null;
    }


}
