
package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Account;
import com.example.demo.repository.AccountRepository;
import com.example.demo.exception.AccountNumberNotFoundException;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account addAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account getAccountByNumber(Long accountno) {
        return accountRepository.findById(accountno)
                .orElseThrow(() -> new AccountNumberNotFoundException(
                        "Account not found: " + accountno));
    }

    @Override
    public List<Account> getAccountsByCustomerId(Long customerId) {
        List<Account> accounts =
                accountRepository.findByCustomerId(customerId);

        if (accounts.isEmpty()) {
            throw new AccountNumberNotFoundException(
                    "No savings account found for customer ID: "
                            + customerId);
        }

        return accounts;
    }
}
