
package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "accountno")
	private Long accountno;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "opening_date", nullable = false)
    private LocalDate openingDate;

    @Column(name = "balance", nullable = false)
    private double balance;

    @Column(name = "account_type")
    private String accountType;

    public Account() {
    }

    public Long getAccountno() {
        return accountno;
    }

    public void setAccountno(Long accountno) {
        this.accountno = accountno;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public LocalDate getOpeningDate() {
        return openingDate;
    }

    public void setOpeningDate(LocalDate openingDate) {
        this.openingDate = openingDate;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}
