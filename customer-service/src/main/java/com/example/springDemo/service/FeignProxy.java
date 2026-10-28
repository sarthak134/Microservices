
package com.example.springDemo.service;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.springDemo.dto.CustomerSavingDetails;

@FeignClient(
    name = "account-service",
    url = "${account.service.url}"
)
public interface FeignProxy {

    @GetMapping("/api/v1/customers/savings/{customerid}")
    List<CustomerSavingDetails> getSavingDetails(
        @PathVariable("customerid") Long customerId
    );
}
