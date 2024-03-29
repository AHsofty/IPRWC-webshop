package com.example.storemanager.seeder;


import com.example.storemanager.Dao.UserDAO;
import com.example.storemanager.model.Role;
import com.example.storemanager.model.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AdminSeeder {
    private final UserDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private final Logger logger;

    @Value("${super-admin.name}")
    private String superAdminName;

    @Value("${super-admin.password}")
    private String superAdminPassword;

    public void seed() {
        var admin = User.builder()
                .username(superAdminName)
                .password(passwordEncoder.encode(superAdminPassword))
                .role(Role.SUPERADMIN)
                .build();
        try {
            this.userDAO.save(admin);
        } catch (Exception e) {
            logger.warn("couldn't create admin account: " + e.getMessage());
        }
    }
}