package com.example.cistron_javaproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // Refers to login.html in templates/
    }
     @PostMapping("/login")
    public String handleLogin(@RequestParam String username,
                              @RequestParam String password) {
        // You can add logic here (check DB, validate, etc.)
        return "redirect:/main";  // Load main.html
    }
    @GetMapping("/main")
public String showMainPage() {
    return "main"; // Loads main.html from templates
}
@GetMapping("/results")
public String showResultsPage() {
    return "results"; // renders results.html from templates folder
}
}
