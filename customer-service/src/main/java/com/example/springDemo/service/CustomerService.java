package com.example.springDemo.service;

import java.util.List;

import com.example.springDemo.dto.CustomerRequest;
import com.example.springDemo.dto.CustomerResponse;
import com.example.springDemo.dto.CustomerSavingDetails;

public interface CustomerService {
	
	CustomerResponse addCustomer(CustomerRequest request);
	
	CustomerResponse getCustomer(Long customerId);
	
	List<CustomerResponse> getAllCustomers();
	List<CustomerSavingDetails> findSavingDetails(Long customerId);
}
