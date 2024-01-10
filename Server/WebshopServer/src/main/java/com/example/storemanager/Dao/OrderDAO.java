package com.example.storemanager.Dao;

import com.example.storemanager.Repository.OrderRepository;
import com.example.storemanager.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderDAO {
    private final OrderRepository orderRepository;

    public Order save(Order order) {
        return orderRepository.save(order);
    }
}