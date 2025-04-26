// package com.example.cistron_javaproject.controller;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestParam;

// @Controller
// public class LoginController {

//     @GetMapping("/login")
//     public String showLoginPage() {
//         return "login"; // Refers to login.html in templates/
//     }
//      @PostMapping("/login")
//     public String handleLogin(@RequestParam String username,
//                               @RequestParam String password) {
//         // You can add logic here (check DB, validate, etc.)
//         return "redirect:/main";  // Load main.html
//     }
//     @GetMapping("/main")
// public String showMainPage() {
//     return "main"; // Loads main.html from templates
// }
// @GetMapping("/results")
// public String showResultsPage() {
//     return "results"; // renders results.html from templates folder
// }
// }
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

    // Handle Registration
    @PostMapping("/register")
    public String handleRegistration(@RequestParam String username,
                                     @RequestParam String password) {

        return "redirect:/login"; // Redirect to login page after registration
    }

    // Show Login Page
    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // login.html in templates/
    }

    // Handle Login
    /**
     * @param username
     * @param password
     * @return
     */
    @PostMapping("/login")
    public String handleLogin(@RequestParam String username,
                              @RequestParam String password) {
        return "redirect:/main"; // Redirect to main page
    }

    // Main page after login
    @GetMapping("/main")
    public String showMainPage() {
        return "main"; // main.html
    }
    
    
    @PostMapping("/analyze")
    public String analyzeDNA(@RequestParam("dnaSequence") String dnaSequence, Model model) {
        // Example logic
        String result = dnaSequence.toLowerCase(); // Dummy processing
        model.addAttribute("sequence", dnaSequence);
        model.addAttribute("result", result);

        return "results"; // results.html
    }

    // (Optional) DNA results page
    @GetMapping("/results")
    public String showResultsPage() {
        return "results"; // results.html
    }
}

