# Introduction

This is just a simple project for my **Information Theory** course, there were 2 exercises and they are hosted using **Spring Framework**.

# Ex1

You were given a matrix of size mxn which is the distribution of 2 variables x and y. You need to calculate their entropy, conditional entropy and other stuffs relate to entropy.

# Ex2

You have a text and you need to encode it using Huffman and Shannon Fano encoding scheme.

# Technology

|Language                |Purpose                        |Libraries/Framworks                 |
|----------------|-------------------------------|-----------------------------|
|Java            |      Back End     |Spring Boot            
|JavaScript          |Math and Logic            |Jquery
|HTML          |Front end|
|CSS          |Front end|Bootstrap

# Prerequisites

Since the project was built with Spring Boot 3.1.1 we will need:

    Java 17 +
You can use older java version but you need to switch Spring Boot version.

# How to run

clone the project to your local machine:

    git clone https://github.com/Twitfbiats/Information-Theory-Spring-Boot.git
Go to project directory and  run maven command using maven wrapper, running 
the first tỉme may take a while to download required libraries:

    ./mvnw spring-boot:run
If the browser isn't opened automatically, go to:

    http://localhost
    
# Demo
[![Encoding][encoding]](preview/encoding.gif)
[![Entropy][entropy]](preview/entropy.gif)

[encoding]: preview/encoding.gif
[entropy]: preview/entropy.gif