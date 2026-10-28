
package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import com.example.demo.entity.Account;
import com.example.demo.service.AccountService;

@RestController
@RequestMapping("/api/v1/accounts")

public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/savings")
    public List<Account> getSavings() {
        return accountService.getAllAccounts();
    }

    @PostMapping("/savings")
    @ResponseStatus(HttpStatus.CREATED)
    public Account addSavings(@RequestBody Account account) {
        return accountService.addAccount(account);
    }

    @GetMapping("/customers/{customerid}")
    public List<Account> getCustomerSavings(
            @PathVariable("customerid") Long customerId) {
        return accountService.getAccountsByCustomerId(customerId);
    }

    @GetMapping("/customers/savings/{customerid}")
    public List<Account> getSavingsSummary(
            @PathVariable("customerid") Long customerId) {
        return accountService.getAccountsByCustomerId(customerId);
    }
}
