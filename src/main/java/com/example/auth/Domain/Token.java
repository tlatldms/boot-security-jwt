package com.example.auth.Domain;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@Data
@RedisHash
public class Token {

    @Id
    String id;

    private String username;
    private String token;

}
