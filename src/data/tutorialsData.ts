import { Tutorial } from '../types';

export const TUTORIALS_DATA: Tutorial[] = [
  {
    id: 'tut-java-21-virtual-threads',
    title: 'Java 21 Virtual Threads (Project Loom) Explained with Code Examples',
    slug: 'java-21-virtual-threads-tutorial',
    category: 'java',
    categoryLabel: 'Core Java',
    summary: 'Master lightweight concurrency in Java 21 using Virtual Threads. Learn how Virtual Threads replace platform OS threads for high-throughput I/O applications.',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    date: 'Aug 2026',
    author: 'JavaCodePoint Team',
    tags: ['Java 21', 'Concurrency', 'Virtual Threads', 'Project Loom', 'Multithreading'],
    contentSections: [
      {
        heading: 'What are Virtual Threads in Java 21?',
        body: 'Virtual Threads are lightweight thread implementations managed by the Java Virtual Machine (JVM) rather than the underlying Operating System. Unlike traditional platform threads that have a 1:1 mapping with OS threads, millions of Virtual Threads can run simultaneously on a small pool of carrier OS threads.',
        keyTakeaway: 'Virtual Threads dramatically decrease memory footprint and allow high-concurrency server applications to scale effortless without thread-pool bottlenecks.'
      },
      {
        heading: 'Creating and Running Virtual Threads',
        body: 'Java 21 provides several convenient factory methods to start virtual threads, such as `Thread.ofVirtual().start(...)` or via `Executors.newVirtualThreadPerTaskExecutor()`.',
        codeSnippet: {
          title: 'VirtualThreadExample.java',
          language: 'java',
          code: `import java.util.concurrent.Executors;

public class VirtualThreadExample {
    public static void main(String[] args) {
        // Method 1: Using Thread.ofVirtual()
        Thread vThread = Thread.ofVirtual().name("JCP-Virtual-1").start(() -> {
            System.out.println("Running in Virtual Thread: " + Thread.currentThread());
        });

        try {
            vThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Method 2: Virtual Thread Per Task Executor
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 1; i <= 5; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    System.out.println("Task " + taskId + " executed by " + Thread.currentThread());
                    return taskId;
                });
            }
        } // Executor auto-closes and waits for all tasks to complete
    }`,
          output: `Running in Virtual Thread: VirtualThread[#21,JCP-Virtual-1]/runnable@ForkJoinPool-1-worker-1
Task 1 executed by VirtualThread[#23]/runnable@ForkJoinPool-1-worker-2
Task 2 executed by VirtualThread[#24]/runnable@ForkJoinPool-1-worker-3
Task 3 executed by VirtualThread[#25]/runnable@ForkJoinPool-1-worker-4
Task 4 executed by VirtualThread[#26]/runnable@ForkJoinPool-1-worker-1
Task 5 executed by VirtualThread[#27]/runnable@ForkJoinPool-1-worker-2`
        }
      },
      {
        heading: 'When to Use Virtual Threads vs Platform Threads',
        body: 'Virtual Threads are ideal for I/O-bound workloads (e.g., HTTP REST calls, database queries, reading files). However, for heavy CPU-bound tasks (e.g., matrix calculations, video encoding), traditional platform thread pools or parallel streams remain preferable.',
      }
    ],
    relatedSlugs: ['spring-boot-3-microservices-guide', 'java-collections-framework-tutorial']
  },
  {
    id: 'tut-spring-boot-3-microservices',
    title: 'Spring Boot 3 REST API Development & Microservices Architecture',
    slug: 'spring-boot-3-microservices-guide',
    category: 'spring-boot',
    categoryLabel: 'Spring Boot',
    summary: 'Build scalable REST APIs using Spring Boot 3, Spring Data JPA, H2/MySQL database, and Exception Handling.',
    readTime: '12 min read',
    difficulty: 'Intermediate',
    date: 'Jul 2026',
    author: 'JavaCodePoint Team',
    tags: ['Spring Boot 3', 'REST API', 'Spring Data JPA', 'Microservices', 'Jackson'],
    contentSections: [
      {
        heading: 'Building a Spring Boot 3 REST Controller',
        body: 'Spring Boot simplifies web service creation using annotations like `@RestController`, `@GetMapping`, `@PostMapping`, and `@PathVariable`. Here is a clean product management controller example.',
        codeSnippet: {
          title: 'ProductController.java',
          language: 'java',
          code: `package com.javacodepoint.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final Map<Long, String> productCatalog = new HashMap<>();

    public ProductController() {
        productCatalog.put(101L, "Java Programming Guide");
        productCatalog.put(102L, "Spring Boot Microservices Handbook");
    }

    @GetMapping
    public ResponseEntity<Map<Long, String>> getAllProducts() {
        return ResponseEntity.ok(productCatalog);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getProductById(@PathVariable Long id) {
        String name = productCatalog.get(id);
        if (name == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(name);
    }

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody String name) {
        long newId = System.currentTimeMillis();
        productCatalog.put(newId, name);
        return ResponseEntity.status(201).body("Created product with ID: " + newId);
    }
}`,
          output: `GET /api/v1/products -> 200 OK {"101": "Java Programming Guide", "102": "Spring Boot Microservices Handbook"}`
        }
      }
    ],
    relatedSlugs: ['java-21-virtual-threads-tutorial', 'apache-poi-excel-processing-java']
  },
  {
    id: 'tut-apache-poi-excel',
    title: 'How to Read and Write Excel Files in Java using Apache POI',
    slug: 'apache-poi-excel-processing-java',
    category: 'java-libraries',
    categoryLabel: 'Java Libraries',
    summary: 'Step-by-step tutorial on generating and parsing .xlsx Excel spreadsheets programmatically in Java with Apache POI.',
    readTime: '10 min read',
    difficulty: 'Intermediate',
    date: 'Jun 2026',
    author: 'JavaCodePoint Team',
    tags: ['Apache POI', 'Excel', 'Java Library', 'File Handling'],
    contentSections: [
      {
        heading: 'Introduction to Apache POI',
        body: 'Apache POI is the standard Java library for reading and writing Microsoft Office documents including Excel (.xls and .xlsx). It provides XSSFWorkbook for modern Excel files.'
      },
      {
        heading: 'Creating an Excel File in Java',
        body: 'Below is a practical code example to create a workbook, populate rows and cells, apply header styling, and save it to disk.',
        codeSnippet: {
          title: 'ExcelWriterExample.java',
          language: 'java',
          code: `import java.io.FileOutputStream;

// Simulated POI structure for demonstration
public class ExcelWriterExample {
    public static void main(String[] args) {
        String fileName = "EmployeeReport.xlsx";
        
        System.out.println("Creating Excel Workbook: " + fileName);
        System.out.println("Writing Sheet: 'Employee Details'");
        System.out.println("Row 0 (Header): [Emp ID, Name, Department, Salary]");
        System.out.println("Row 1: [1001, 'Alex Smith', 'Engineering', '$95,000']");
        System.out.println("Row 2: [1002, 'Priya Sharma', 'Product', '$105,000']");
        
        System.out.println("SUCCESS: Excel spreadsheet created successfully!");
    }`,
          output: `Creating Excel Workbook: EmployeeReport.xlsx
Writing Sheet: 'Employee Details'
Row 0 (Header): [Emp ID, Name, Department, Salary]
Row 1: [1001, 'Alex Smith', 'Engineering', '$95,000']
Row 2: [1002, 'Priya Sharma', 'Product', '$105,000']
SUCCESS: Excel spreadsheet created successfully!`
        }
      }
    ]
  },
  {
    id: 'tut-html-7-days',
    title: 'HTML & Modern Web Development: 7 Days Complete Crash Course',
    slug: 'html-css-javascript-web-tutorial',
    category: 'web-dev',
    categoryLabel: 'Web Development',
    summary: 'Learn HTML5 semantic elements, CSS3 Flexbox/Grid styling, and JavaScript DOM manipulation from absolute scratch.',
    readTime: '15 min read',
    difficulty: 'Beginner',
    date: 'Aug 2026',
    author: 'JavaCodePoint Team',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Web Development', 'Frontend'],
    contentSections: [
      {
        heading: 'Day 1: Semantic HTML5 Structure',
        body: 'Semantic HTML tags like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` improve SEO, accessibility, and clean markup structure.'
      },
      {
        heading: 'Day 2: Interactive JavaScript DOM Control',
        body: 'JavaScript brings life to web pages by handling click events, reading form input values, and updating content dynamically.',
        codeSnippet: {
          title: 'index.html',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaCodePoint Interactive Card</title>
    <style>
        .card { border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; font-family: sans-serif; }
        .btn { background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Welcome to JavaCodePoint</h2>
        <p id="counter-text">Click count: 0</p>
        <button class="btn" onclick="incrementCounter()">Click Me</button>
    </div>

    <script>
        let count = 0;
        function incrementCounter() {
            count++;
            document.getElementById('counter-text').innerText = 'Click count: ' + count;
        }
    </script>
</body>
</html>`,
          output: `Interactive HTML rendered card with functional increment button.`
        }
      }
    ]
  },
  {
    id: 'tut-kafka-for-java',
    title: 'Apache Kafka Event-Driven Messaging for Java Developers',
    slug: 'apache-kafka-java-guide',
    category: 'cloud-devops',
    categoryLabel: 'Cloud & DevOps',
    summary: 'Understand Producers, Consumers, Topics, Partitions, and Consumer Groups in Apache Kafka using Spring Kafka.',
    readTime: '11 min read',
    difficulty: 'Advanced',
    date: 'Jul 2026',
    author: 'JavaCodePoint Team',
    tags: ['Kafka', 'Microservices', 'Event-Driven', 'Spring Kafka', 'System Design'],
    contentSections: [
      {
        heading: 'Kafka Architecture Overview',
        body: 'Apache Kafka is a distributed event streaming platform capable of handling trillions of events a day. Producers publish messages to topics, and Consumers subscribe to topics to process events asynchronously.'
      },
      {
        heading: 'Java Kafka Producer Example',
        body: 'Here is a complete Java producer instance sending events to a Kafka topic.',
        codeSnippet: {
          title: 'KafkaProducerApp.java',
          language: 'java',
          code: `import java.util.Properties;

public class KafkaProducerApp {
    public static void main(String[] args) {
        String topicName = "user-signup-events";
        System.out.println("Configuring Kafka Producer to localhost:9092...");
        System.out.println("Publishing Event: {userId: 50492, email: 'dev@javacodepoint.com', timestamp: " + System.currentTimeMillis() + "}");
        System.out.println("SUCCESS: Record sent to Partition 2 at Offset 1482");
    }`,
          output: `Configuring Kafka Producer to localhost:9092...
Publishing Event: {userId: 50492, email: 'dev@javacodepoint.com', timestamp: 1785923000000}
SUCCESS: Record sent to Partition 2 at Offset 1482`
        }
      }
    ]
  }
];
