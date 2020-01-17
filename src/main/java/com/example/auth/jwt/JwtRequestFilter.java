package com.example.auth.jwt;

import com.example.auth.Domain.Token;
import com.example.auth.service.JwtUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    JwtTokenUtil jtu;

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        //System.out.println("JWTREQUESTFILTER!!!!!!");
        final String requestTokenHeader = request.getHeader("Authorization");
        //response.setHeader("Access-Control-Allow-Origin", "*");
        String username = null;
        String jwtToken = null;
        // JWT Token is in the form "Sieun token". Remove Sieun word and get
        // only the Token
        if (requestTokenHeader == null ) {
            System.out.println("reuqestTokenHeader is null !!!!!");
        }
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Sieun ")) {
            jwtToken = requestTokenHeader.substring(6);
            try {
                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT Token has expired");
            }
            System.out.println("success to get token: " + jwtToken);
        } else {
            logger.warn("JWT Token does not begin with Sieun String");
        }

        //Redis에 있는지 없는지 확인하기.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            ValueOperations<String, Object> vop = redisTemplate.opsForValue();
            Token result = (Token)vop.get(username);
            //System.out.println("result: " + result);
            String tokstr = result.getToken();
            System.out.println("result tokstr: " + tokstr);
            System.out.println("expire date: " + jtu.getExpirationDateFromToken(tokstr));
            if (!jtu.isTokenExpired(tokstr)) {
                logger.info("this Token is VALID !!!");
                UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // After setting the Authentication in the context, we specify
                // that the current user is authenticated. So it passes the
                // Spring Security Configurations successfully.
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                logger.info("this Token is expired !!!");
            }



        }


        //여긴 userDetails로 확인하는거.
        /*
        // Once we get the token validate it.
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
            System.out.println("valid user with token request something. username: " + username);
            // if token is valid configure Spring Security to manually set
            // authentication
            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {
                logger.info("this Token is VALID !!!");

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // After setting the Authentication in the context, we specify
                // that the current user is authenticated. So it passes the
                // Spring Security Configurations successfully.
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

            }

        }
        */
        chain.doFilter(request, response);
    }
}
