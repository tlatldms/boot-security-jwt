package com.example.auth.Repository;

import com.example.auth.Domain.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Integer> {
    Account findUserByUsername(String username);
    Account findUserByEmail(String email);
}
