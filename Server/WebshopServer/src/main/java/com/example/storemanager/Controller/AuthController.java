package com.example.storemanager.Controller;


import com.example.storemanager.Service.AuthenticationService;
import com.example.storemanager.dto.AuthRequestDTO;
import com.example.storemanager.dto.AuthResponseDTO;
import com.example.storemanager.model.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;

    @PostMapping(value = "/login")
    public ApiResponse<AuthResponseDTO> login(@RequestBody AuthRequestDTO loginDTO) {
        String token = authenticationService.login(loginDTO.getUsername(), loginDTO.getPassword());

        return new ApiResponse<>(new AuthResponseDTO(token));
    }

    @GetMapping(value = "/validate/{token}")
    public ApiResponse<String> validate(@PathVariable String token) {
        boolean isValid = authenticationService.isValidToken(token);
        return new ApiResponse<>(isValid ? "valid" : "invalid");
    }
}
