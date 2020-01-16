package com.example.auth.Repository;

import com.example.auth.Domain.Token;
import org.springframework.data.repository.CrudRepository;

public interface RedisRepository extends CrudRepository<Token, String> {
}
