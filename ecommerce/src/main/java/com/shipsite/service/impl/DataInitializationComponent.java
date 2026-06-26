package com.shipsite.service.impl;


@Component
@RequiredArgsConstructor
public class DataInitializationComponent implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
   initializeAdminUser();
  }

  
}