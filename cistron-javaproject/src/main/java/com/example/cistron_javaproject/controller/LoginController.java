
package com.example.cistron_javaproject.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    public LoginController() {
    }

    // Show Registration Page first
    @GetMapping("/")
    public String showRegistrationPage() {
        return "register"; // register.html in templates/
    }

    // Main page after login
    @GetMapping("/main")
    public String showMainPage() {
        return "main"; // main.html
    }
        
    @PostMapping("/analyze")
public String analyzeDNA(@RequestParam("dnaSequence") String dnaSequence, Model model) {
    String result = dnaSequence.toLowerCase();
    model.addAttribute("sequence", dnaSequence);
    model.addAttribute("result", result);
    
    return "redirect:/results"; 
}


    // (Optional) DNA results page
    @GetMapping("/results")
    public String showResultsPage() {
        return "results"; // results.html
    }
}

