package com.example.auth.service;

import com.example.auth.Domain.Account;
import com.example.auth.Domain.AccountRole;
import com.example.auth.Repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = repository.findUserByUsername(username);
        List<GrantedAuthority> roles = new ArrayList<>();
        if (account == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new User(account.getUsername(), account.getPassword(), roles);
    }

}
