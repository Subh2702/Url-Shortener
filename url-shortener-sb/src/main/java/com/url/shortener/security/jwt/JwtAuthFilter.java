package com.url.shortener.security.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter{
    @Autowired
    private JwtUtils jwtTokenPovider;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try{
            String jwt = jwtTokenPovider.getJwtFromHeader(request);//getting the jwt token from the request header
            if(jwt != null && jwtTokenPovider.validateJwtToken(jwt))
            {
                String username = jwtTokenPovider.getUsernameFromJwt(jwt);//getting the username from the jwt token
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);//loading the user details from the database
                if(userDetails != null)
                {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));//auth object ko set kar rahe hain
                    SecurityContextHolder.getContext().setAuthentication(authentication);//security context ko user ki information se set kar rahe hain
                }
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        filterChain.doFilter(request, response);//filter chain ko continue kar rahe hain
    }
}
