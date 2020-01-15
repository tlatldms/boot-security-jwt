package com.example.auth.Domain;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable=false, unique=true, length=30)
    private String username;

    @Column(nullable=false, unique=true, length=50)
    private String email;


    private String password;

    @CreationTimestamp
    private Date regdate;

    @UpdateTimestamp
    private Date updatedate;


    //Role 따로 클래스 둘 때

    @OneToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="username")
    private List<AccountRole> roles;


    //private String role;
}
