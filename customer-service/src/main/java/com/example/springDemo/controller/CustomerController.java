package com.example.springDemo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


import com.example.springDemo.dto.CustomerRequest;
import com.example.springDemo.dto.CustomerResponse;
import com.example.springDemo.service.CustomerService;
import com.example.springDemo.dto.CustomerSavingDetails;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/customers")

public class CustomerController {
	
	private final CustomerService service;
	
	public  CustomerController (CustomerService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<CustomerResponse> getAllCustomers(){
		return service.getAllCustomers();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CustomerResponse addCustomer(@Valid @RequestBody CustomerRequest request ) {
		return service.addCustomer(request);
	}
	
	@GetMapping("/{customerId}")
	public CustomerResponse getCustomer(@PathVariable Long customerId) {
		return service.getCustomer(customerId);
	}
	

@GetMapping("/savings/{customerid}")
public List<CustomerSavingDetails> getSavingDetails(
        @PathVariable("customerid") Long customerId) {

    return service.findSavingDetails(customerId);
}

	
	@GetMapping("/loans/{customerId}")
	public Object getLoans(@PathVariable Long customerId) {
		return null;
	}
	

}
