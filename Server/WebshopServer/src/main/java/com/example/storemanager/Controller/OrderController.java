package com.example.storemanager.Controller;

import com.example.storemanager.Dao.OrderDAO;
import com.example.storemanager.Dao.ProductDao;
import com.example.storemanager.Dao.UserDAO;
import com.example.storemanager.Service.JwtService;
import com.example.storemanager.model.Order;
import com.example.storemanager.model.Product;
import com.example.storemanager.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderDAO orderDAO;
    private final UserDAO userDAO;
    private final ProductDao productDAO;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestHeader("Authorization") String token, @RequestBody List<UUID> productIds) {
        String userId = jwtService.extractUserId(token.substring(7));
        User user = userDAO.findById(UUID.fromString(userId)).orElseThrow();
        List<Product> products = productIds.stream()
                .map(productDAO::findById)
                .collect(Collectors.toList());
        Order order = Order.builder()
                .customer(user)
                .products(products)
                .build();
        Order savedOrder = orderDAO.save(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }
}