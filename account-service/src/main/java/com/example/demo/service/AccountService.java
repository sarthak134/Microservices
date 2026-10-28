
package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Account;

public interface AccountService {

    List<Account> getAllAccounts();

    Account addAccount(Account account);

    Account getAccountByNumber(Long accountno);

    List<Account> getAccountsByCustomerId(Long customerId);
}
