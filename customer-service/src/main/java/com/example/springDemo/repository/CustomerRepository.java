package com.example.springDemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springDemo.entity.Customer;
import com.example.springDemo.dto.CustomerSavingDetails;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
	
	boolean existsByEmailIgnoreCase(String email);


	

}
