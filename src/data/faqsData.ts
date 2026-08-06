import { FaqItem } from '../types';

export const JAVA_FULLSTACK_FAQS_DATA: FaqItem[] = [
  {
    id: 'faq-virtual-threads-java21',
    question: 'What are Java 21 Virtual Threads (Project Loom) and how do they differ from Platform Threads?',
    category: 'Core Java',
    level: 'Advanced',
    source: 'Oracle Java 21 Docs & JEP 444',
    sourceUrl: 'https://docs.oracle.com/en/java/javase/21/auto/virtual-threads.html',
    answer: `Virtual Threads are lightweight threads managed directly by the Java Virtual Machine (JVM) rather than the underlying operating system (OS). 

1. **Memory Overhead**: Platform threads map 1-to-1 with OS kernel threads and allocate ~1MB stack memory per thread. Virtual threads map many-to-1 onto carrier OS threads and start with as little as a few hundred bytes of heap memory.
2. **Throughput**: Virtual threads allow Java full-stack applications (like Spring Boot servers) to handle millions of concurrent blocking HTTP requests without running out of OS thread limits.
3. **Usage**: Unmounts from carrier thread when performing blocking I/O (e.g., database queries, REST API calls), allowing carrier threads to execute other virtual tasks.`,
    codeExample: {
      language: 'java',
      code: `// Starting Virtual Threads in Java 21
try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000).forEach(i -> {
        executor.submit(() -> {
            // High throughput blocking operation (e.g. REST API fetch)
            Thread.sleep(1000);
            return i;
        });
    });
} // Executor auto-closes and awaits task completion`,
      description: 'Creating a virtual thread per task executor handling 10,000 concurrent blocking operations seamlessly.'
    },
    keyTakeaways: [
      'Managed by JVM in user space, not OS kernel space',
      'Ideal for I/O bound tasks (DB queries, microservice HTTP calls)',
      'Configurable in Spring Boot 3.2+ with spring.threads.virtual.enabled=true'
    ],
    tags: ['Java 21', 'Virtual Threads', 'Project Loom', 'Concurrency', 'JVM']
  },
  {
    id: 'faq-cors-spring-boot-react',
    question: 'How do you resolve Cross-Origin Resource Sharing (CORS) errors in a Spring Boot + React/Angular Full Stack app?',
    category: 'Frontend & Web',
    level: 'Beginner',
    source: 'Spring Framework Web Reference & W3C Spec',
    sourceUrl: 'https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html',
    answer: `CORS errors occur when a frontend app (e.g., React running on http://localhost:3000) makes a request to a backend on a different origin (e.g., Spring Boot on http://localhost:8080) and the backend headers do not permit cross-origin access.

You can resolve this in Spring Boot through three main approaches:
1. **Controller Level**: Use \`@CrossOrigin\` annotation on specific controllers or methods.
2. **Global WebMvcConfigurer**: Define a global CORS configuration bean for all API endpoints.
3. **Spring Security Filter**: Configure CORS inside \`SecurityFilterChain\` if Spring Security is enabled.`,
    codeExample: {
      language: 'java',
      code: `import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000", "https://myapp.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
            }
        };
    }
}`,
      description: 'Global CORS Configuration Bean in Spring Boot'
    },
    keyTakeaways: [
      'Browser blocks client response if Access-Control-Allow-Origin header is missing',
      'Always configure CORS in Spring Security if using spring-boot-starter-security',
      'Use allowCredentials(true) when handling HTTP cookies or Authorization headers'
    ],
    tags: ['CORS', 'Spring Boot', 'React', 'Web Security', 'REST API']
  },
  {
    id: 'faq-hibernate-n1-problem',
    question: 'What is the Hibernate N+1 Query Problem in Spring Data JPA and how do you fix it?',
    category: 'Databases & Persistence',
    level: 'Intermediate',
    source: 'Vlad Mihalcea / Hibernate ORM Docs',
    sourceUrl: 'https://hibernate.org/orm/documentation/',
    answer: `The N+1 problem occurs when fetching an entity with lazy-loaded child relationships. JPA executes **1 query** to fetch N parent records, and then executes **N additional queries** to fetch child records for each parent inside a loop.

**How to Fix**:
1. **JOIN FETCH in JPQL**: Force an explicit SQL JOIN in your query repository.
2. **Entity Graphs (\`@EntityGraph\`)**: Declaratively specify attributes to eagerly fetch.
3. **DTO Projections**: Query only required fields directly into a record/class projection instead of managed entities.`,
    codeExample: {
      language: 'java',
      code: `public interface UserRepository extends JpaRepository<User, Long> {

    // ❌ Causes N+1 problem if orders are lazy loaded in loop
    // List<User> findAll();

    // ✅ FIX 1: Using JOIN FETCH in JPQL query
    @Query("SELECT DISTINCT u FROM User u JOIN FETCH u.orders")
    List<User> findAllWithOrdersFetch();

    // ✅ FIX 2: Using Spring Data @EntityGraph
    @EntityGraph(attributePaths = {"orders", "department"})
    List<User> findAll();
}`,
      description: 'Solving N+1 queries using @Query JOIN FETCH and @EntityGraph in Spring Data JPA.'
    },
    keyTakeaways: [
      'Identify N+1 by logging SQL queries in dev mode: spring.jpa.show-sql=true',
      'JOIN FETCH retrieves parent and children in a single SQL query',
      '@EntityGraph avoids duplicate code by dynamically overriding fetch strategies'
    ],
    tags: ['Hibernate', 'JPA', 'Spring Data', 'Performance', 'SQL']
  },
  {
    id: 'faq-spring-boot-autoconfiguration',
    question: 'How does Spring Boot Auto-Configuration work under the hood?',
    category: 'Spring Boot',
    level: 'Intermediate',
    source: 'Spring Boot Reference Documentation',
    sourceUrl: 'https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.auto-configuration',
    answer: `Spring Boot Auto-Configuration automatically configures your Spring application based on the jar dependencies present on the classpath.

1. **Trigger**: Started by \`@SpringBootApplication\` which includes \`@EnableAutoConfiguration\`.
2. **SPI Mechanism**: Spring reads \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\` from starter JARs.
3. **Conditional Beans**: Config classes use conditional annotations such as \`@ConditionalOnClass\`, \`@ConditionalOnMissingBean\`, and \`@ConditionalOnProperty\` to decide whether a bean should be registered.`,
    codeExample: {
      language: 'java',
      code: `@Configuration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public HikariDataSource dataSource() {
        return new HikariDataSource(); // Configures HikariCP if present on classpath!
    }
}`,
      description: 'Conceptual structure of Spring Boot conditional auto-configuration bean'
    },
    keyTakeaways: [
      'Uses SPI imports files in META-INF/spring',
      '@ConditionalOnMissingBean allows developer custom beans to override default auto-configuration',
      'Exclude auto-configs via @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})'
    ],
    tags: ['Spring Boot', 'Auto-Configuration', 'Spring Framework', 'IoC', 'Dependency Injection']
  },
  {
    id: 'faq-jwt-vs-session-fullstack',
    question: 'When should you use Stateless JWT Authentication vs Stateful HTTP Session in Java Full Stack apps?',
    category: 'System Architecture',
    level: 'Intermediate',
    source: 'OWASP Authentication Cheat Sheet & StackOverflow Trends',
    sourceUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html',
    answer: `Choosing between Stateless JWT and Stateful Sessions depends on architecture scale and security requirements:

- **JWT (Stateless)**:
  - Token signed by server with secret key, stored on client (HttpOnly cookie or Memory/Local Storage).
  - Server does not store session state in memory/database.
  - Ideal for Microservices, Mobile apps, and SPA frontends (React/Angular).
  - *Drawback*: Token revocation is difficult before expiration without a Redis blacklist.

- **Session (Stateful)**:
  - JSESSIONID stored in HTTP cookie; session state stored in server memory or Redis.
  - Easy session invalidation and instantaneous logout on server side.
  - Ideal for traditional monolithic web applications or Spring MVC with Thymeleaf.`,
    codeExample: {
      language: 'java',
      code: `// Spring Security 6 Stateless JWT Filter Configuration
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}`,
      description: 'Configuring Stateless JWT Session Management in Spring Security 6'
    },
    keyTakeaways: [
      'JWT removes database session lookup on every API request',
      'Store JWTs in HttpOnly, SameSite=Strict cookies to protect against XSS',
      'Use Refresh Tokens to handle long-lived user sessions securely'
    ],
    tags: ['Security', 'JWT', 'Spring Security', 'React', 'Session Management']
  },
  {
    id: 'faq-java-records-sealed-classes',
    question: 'What are Java Records and Sealed Classes introduced in modern Java (Java 17/21)?',
    category: 'Core Java',
    level: 'Intermediate',
    source: 'OpenJDK JEP 395 & JEP 409',
    sourceUrl: 'https://openjdk.org/jeps/395',
    answer: `Java 17 LTS introduced two major features for domain modeling:

1. **Records**: Immutable data carrier classes that automatically generate getters, \`equals()\`, \`hashCode()\`, and \`toString()\`. Ideal for DTOs (Data Transfer Objects) in Spring Boot REST APIs.
2. **Sealed Classes**: Restricts which classes or interfaces may extend or implement them. Enables exhaustive pattern matching in \`switch\` expressions.`,
    codeExample: {
      language: 'java',
      code: `// 1. Immutable Record for Spring Boot REST API DTO
public record UserResponseDto(
    Long id,
    String email,
    String fullName,
    LocalDateTime createdAt
) {}

// 2. Sealed Hierarchy for Domain States
public sealed interface PaymentStatus permits Success, Pending, Failed {}

public record Success(String transactionId, BigDecimal amount) implements PaymentStatus {}
public record Pending(String refCode) implements PaymentStatus {}
public record Failed(String errorCode, String reason) implements PaymentStatus {}`,
      description: 'Defining Records and Sealed Interfaces in modern Java'
    },
    keyTakeaways: [
      'Records reduce boilerplate code dramatically compared to traditional POJOs',
      'Record fields are implicitly private final',
      'Sealed classes guarantee exhaustive compile-time checking in pattern matching'
    ],
    tags: ['Java 17', 'Java 21', 'Records', 'Sealed Classes', 'DTO']
  },
  {
    id: 'faq-spring-transactional-propagation',
    question: 'How do @Transactional propagation levels and isolation levels work in Spring Boot?',
    category: 'Databases & Persistence',
    level: 'Advanced',
    source: 'Spring Framework Transaction Management Reference',
    sourceUrl: 'https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative.html',
    answer: `The \`@Transactional\` annotation manages database transactions declaratively via Spring AOP proxies.

**Propagation Types**:
1. **REQUIRED** (Default): Joins existing transaction if one exists, or creates a new transaction.
2. **REQUIRES_NEW**: Always suspends current transaction and creates an isolated inner transaction.
3. **MANDATORY**: Must execute within an existing transaction, otherwise throws exception.
4. **NESTED**: Executes within a nested transaction using database savepoints.

**Common Gotcha**: Self-invocation (calling a \`@Transactional\` method from another method within the same class) bypasses Spring AOP proxy and disables transaction boundary!`,
    codeExample: {
      language: 'java',
      code: `@Service
public class OrderService {

    @Autowired
    private AuditLogService auditService;

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
    public void processOrder(OrderDto dto) {
        // Main order processing inside primary transaction
        orderRepository.save(new Order(dto));
        
        // Audit log saved in isolated transaction (won't roll back if order succeeds)
        auditService.logActivity("ORDER_CREATED", dto.getId());
    }
}`,
      description: 'Declarative transaction propagation with Spring Boot'
    },
    keyTakeaways: [
      'Spring AOP proxy wraps method call with begin/commit/rollback',
      'Unchecked exceptions (RuntimeException, Error) trigger rollback by default; checked exceptions do not unless specified in rollbackFor',
      'REQUIRES_NEW creates independent transaction boundary'
    ],
    tags: ['Spring Boot', '@Transactional', 'Transactions', 'JPA', 'Database']
  },
  {
    id: 'faq-dockerize-spring-react-fullstack',
    question: 'How do you multi-stage build and containerize a Spring Boot + React application with Docker?',
    category: 'DevOps & Cloud',
    level: 'Intermediate',
    source: 'Docker Official Documentation & Spring Guides',
    sourceUrl: 'https://docs.docker.com/build/building/multi-stage/',
    answer: `Multi-stage builds allow you to compile source code in heavyweight build images (Maven/Node) and copy only the compiled static binaries into minimal runtime base images (Alpine/OpenJDK-slim), drastically reducing final image sizes from 1GB+ down to under 150MB.`,
    codeExample: {
      language: 'dockerfile',
      code: `# --- STAGE 1: Build Spring Boot Jar ---
FROM maven:3.9-eclipse-temurin-21-alpine AS backend-builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# --- STAGE 2: Minimal Production Runtime ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]`,
      description: 'Multi-stage Dockerfile for Java Spring Boot application'
    },
    keyTakeaways: [
      'Multi-stage Docker builds minimize container footprint and attack surfaces',
      'Use JRE or Distroless base images for runtime execution',
      'Leverage Docker layer caching by copying pom.xml/package.json prior to source code'
    ],
    tags: ['Docker', 'DevOps', 'Spring Boot', 'Containers', 'Cloud']
  },
  {
    id: 'faq-sse-websockets-spring-react',
    question: 'What is the difference between Server-Sent Events (SSE) and WebSockets in Java Spring Boot & React apps?',
    category: 'Frontend & Web',
    level: 'Intermediate',
    source: 'MDN Web Docs & Spring Messaging Spec',
    sourceUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
    answer: `- **Server-Sent Events (SSE)**:
  - **Direction**: Unidirectional (Server -> Client push over HTTP/1.1 or HTTP/2).
  - **Protocol**: Standard HTTP text/event-stream. Built-in browser auto-reconnection via \`EventSource\` API.
  - **Use Case**: Live news feeds, order tracking dashboards, AI response streaming.

- **WebSockets**:
  - **Direction**: Full Duplex Bidirectional (Client <-> Server).
  - **Protocol**: Upgrades HTTP to \`ws://\` or \`wss://\`. Handled via Spring STOMP / SockJS.
  - **Use Case**: Real-time collaborative editors, multiplayer gaming, chat applications.`,
    codeExample: {
      language: 'java',
      code: `// Spring Boot Controller for Server-Sent Events (SSE)
@GetMapping(path = "/api/stock-ticks", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<StockPrice> streamStockTicks() {
    return Flux.interval(Duration.ofSeconds(1))
               .map(sequence -> new StockPrice("AAPL", 220 + Math.random() * 5));
}`,
      description: 'Streaming real-time SSE updates with Spring WebFlux'
    },
    keyTakeaways: [
      'SSE is simpler to setup and works through standard HTTP proxies',
      'WebSockets are necessary for true two-way low-latency messaging',
      'React consumes SSE natively using const eventSource = new EventSource(url)'
    ],
    tags: ['SSE', 'WebSockets', 'Spring Boot', 'React', 'Real-time']
  },
  {
    id: 'faq-spring-cloud-gateway-microservices',
    question: 'How does API Gateway Pattern (Spring Cloud Gateway) work in Java Microservice Architectures?',
    category: 'System Architecture',
    level: 'Advanced',
    source: 'Spring Cloud Gateway Reference Documentation',
    sourceUrl: 'https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/',
    answer: `An API Gateway serves as the single entry point for client requests in a microservices ecosystem. It handles routing, security authentication, rate limiting, and cross-cutting concerns before forwarding requests to downstream backend services.

Key Components of Spring Cloud Gateway:
1. **Routes**: Defined by an ID, destination URI, predicates, and filters.
2. **Predicates**: Evaluates incoming HTTP request details (headers, path, host, parameters).
3. **Filters**: Modifies request/response before or after routing (e.g. adding authentication headers, rate-limiting tokens).`,
    codeExample: {
      language: 'yaml',
      code: `# application.yml for Spring Cloud Gateway
spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://ORDER-SERVICE # Service Discovery routing
          predicates:
            - Path=/api/orders/**
          filters:
            - AddRequestHeader=X-Gateway-Source, JavaCodePointGateway
            - name: RequestRateLimiter
              args:
                redis-rate-limiter.replenishRate: 10
                redis-[#burstCapacity]: 20`,
      description: 'Spring Cloud Gateway YML route definition with rate limiting'
    },
    keyTakeaways: [
      'Built on Reactive Netty engine (Spring WebFlux)',
      'Provides central authentication filter & SSL termination',
      'Integrates seamlessly with Resilience4j circuit breakers'
    ],
    tags: ['Spring Cloud', 'API Gateway', 'Microservices', 'System Design', 'Architecture']
  },
  {
    id: 'faq-resilience4j-circuit-breaker',
    question: 'How do you implement Fault Tolerance in Spring Boot using Resilience4j Circuit Breaker?',
    category: 'System Architecture',
    level: 'Advanced',
    source: 'Resilience4j Reference & Baeldung',
    sourceUrl: 'https://resilience4j.readme.io/docs/circuitbreaker',
    answer: `Circuit Breakers prevent cascading system failures when downstream services fail or become slow.

**Circuit States**:
1. **CLOSED**: Normal operation. All requests pass through.
2. **OPEN**: Error rate threshold exceeded. Requests immediately fail fast and invoke fallback method without calling remote service.
3. **HALF_OPEN**: Periodically sends sample requests to test if remote service has recovered.`,
    codeExample: {
      language: 'java',
      code: `@Service
public class PaymentGatewayService {

    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    @Retry(name = "paymentService")
    public PaymentResult processPayment(PaymentRequest req) {
        // Remote HTTP call to external gateway
        return restTemplate.postForObject("https://api.stripe.com/pay", req, PaymentResult.class);
    }

    // Fallback executed when circuit is OPEN or exception thrown
    public PaymentResult paymentFallback(PaymentRequest req, Throwable t) {
        log.error("Payment Service Down! Executing fallback: {}", t.getMessage());
        return new PaymentResult("PENDING_RETRY", "Gateway currently unavailable");
    }
}`,
      description: 'Applying Resilience4j @CircuitBreaker annotation in Spring Boot'
    },
    keyTakeaways: [
      'Replaced deprecated Netflix Hystrix in modern Spring Cloud',
      'Configurable failure rate thresholds, ring buffer sizes, and wait durations',
      'Fallback methods must match original signature plus Throwable parameter'
    ],
    tags: ['Resilience4j', 'Circuit Breaker', 'Fault Tolerance', 'Microservices', 'Spring Boot']
  },
  {
    id: 'faq-spring-boot-global-exception-handling',
    question: 'How do you implement clean Global Exception Handling in Spring Boot using @ControllerAdvice and ProblemDetails?',
    category: 'Spring Boot',
    level: 'Intermediate',
    source: 'Spring Boot 3.0 Release Notes & RFC 7807',
    sourceUrl: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-ann-rest-exceptions.html',
    answer: `Spring Boot 3+ adopts the RFC 7807 **Problem Details** specification for standardized HTTP REST API error responses.

Using \`@RestControllerAdvice\` along with \`ProblemDetail\` ensures that all unhandled exceptions return uniform JSON payloads with status codes, error details, and timestamps to the frontend.`,
    codeExample: {
      language: 'java',
      code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException ex) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, ex.getMessage()
        );
        problem.setTitle("Resource Not Found");
        problem.setProperty("timestamp", Instant.now());
        problem.setProperty("errorCode", "ERR_404_NOT_FOUND");
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException ex) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Validation Failed");
        Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
        problem.setProperty("errors", errors);
        return problem;
    }
}`,
      description: 'Standardized RFC 7807 Exception Handler using Spring Boot 3 ProblemDetail'
    },
    keyTakeaways: [
      'Eliminates messy try-catch blocks in individual controller methods',
      'RFC 7807 standardizes error payload structure across enterprise microservices',
      'Custom properties can be appended to ProblemDetail via setProperty()'
    ],
    tags: ['Spring Boot', 'Exception Handling', 'REST API', '@ControllerAdvice', 'Clean Code']
  }
];
