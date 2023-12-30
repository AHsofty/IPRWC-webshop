package com.example.storemanager.mapper;


import com.example.storemanager.dto.UserCreateDTO;
import com.example.storemanager.dto.UserResponseDTO;
import com.example.storemanager.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    public User toEntity(UserCreateDTO userCreateDTO) {
        return User.builder()
                .username(userCreateDTO.getUsername())
                .password(userCreateDTO.getPassword())
                .build();
    }

    public UserResponseDTO fromEntity(User user) {
        return UserResponseDTO
                .builder()
                .username(user.getUsername())
                .id(user.getId())
                .role(user.getRole())
                .build();
    }
}
