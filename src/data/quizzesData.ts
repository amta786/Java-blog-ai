import { QuizCategory } from '../types';

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'quiz-core-java',
    title: 'Core Java & OOPs Concepts',
    iconName: 'Coffee',
    description: 'Test your understanding of Java basics, inheritance, polymorphism, memory management, and stream APIs.',
    questionCount: 5,
    questions: [
      {
        id: 'q1',
        question: 'Which of the following feature is introduced in Java 21?',
        options: [
          'Lambda Expressions',
          'Virtual Threads (Project Loom)',
          'Records',
          'Module System (Project Jigsaw)'
        ],
        correctAnswerIndex: 1,
        explanation: 'Virtual Threads were finalized as a core production feature in Java 21 to provide lightweight concurrency.',
        topic: 'Java 21 Features'
      },
      {
        id: 'q2',
        question: 'What will be the output of the following Java snippet?',
        codeSnippet: `String s1 = new String("Java");
String s2 = new String("Java");
System.out.println((s1 == s2) + " " + s1.equals(s2));`,
        options: [
          'true true',
          'false true',
          'true false',
          'false false'
        ],
        correctAnswerIndex: 1,
        explanation: '`==` compares object reference memory locations (which are distinct for `new String`), whereas `.equals()` compares value content.',
        topic: 'Strings & Memory'
      },
      {
        id: 'q3',
        question: 'Which interface in Java Collections does NOT allow duplicate elements and does NOT guarantee insertion order?',
        options: [
          'ArrayList',
          'HashSet',
          'LinkedHashSet',
          'TreeSet'
        ],
        correctAnswerIndex: 1,
        explanation: '`HashSet` uses a HashMap underneath to store elements. It prevents duplicates but does not preserve order.',
        topic: 'Collections'
      },
      {
        id: 'q4',
        question: 'What is the default value of a boolean variable defined at the class level in Java?',
        options: ['true', 'false', 'null', '0'],
        correctAnswerIndex: 1,
        explanation: 'Instance and class member boolean variables default to `false` when initialized by JVM.',
        topic: 'Java Fundamentals'
      },
      {
        id: 'q5',
        question: 'Which keyword is used to prevent a class from being inherited in Java?',
        options: ['abstract', 'static', 'final', 'private'],
        correctAnswerIndex: 2,
        explanation: 'Marking a class as `final` prevents any other class from extending it.',
        topic: 'OOP Concepts'
      }
    ]
  },
  {
    id: 'quiz-spring-boot',
    title: 'Spring Boot & Microservices',
    iconName: 'Layers',
    description: 'Assess your knowledge on Spring Beans, Dependency Injection, REST Annotations, and Data JPA.',
    questionCount: 4,
    questions: [
      {
        id: 'sq1',
        question: 'Which Spring Boot annotation combines @Controller and @ResponseBody?',
        options: ['@Service', '@Component', '@RestController', '@Repository'],
        correctAnswerIndex: 2,
        explanation: '`@RestController` is a specialized convenience annotation that marks a class as a controller where every method returns a domain object instead of a view.',
        topic: 'Spring Annotations'
      },
      {
        id: 'sq2',
        question: 'What is the default embedded application server used by Spring Boot Web starter?',
        options: ['Jetty', 'Undertow', 'Tomcat', 'Nginx'],
        correctAnswerIndex: 2,
        explanation: 'Apache Tomcat is the default embedded servlet container provided by `spring-boot-starter-web`.',
        topic: 'Spring Boot Essentials'
      },
      {
        id: 'sq3',
        question: 'Which file in a Spring Boot application is used to define key-value properties and server configs?',
        options: ['web.xml', 'pom.xml', 'application.properties', 'manifest.json'],
        correctAnswerIndex: 2,
        explanation: '`application.properties` (or `application.yml`) configures server ports, database URLs, log levels, and custom settings.',
        topic: 'Configuration'
      },
      {
        id: 'sq4',
        question: 'How do you specify a custom HTTP status code 201 Created in a Spring REST response?',
        options: [
          'ResponseEntity.status(HttpStatus.CREATED).body(...)',
          '@ResponseStatus(HttpStatus.CREATED)',
          'Both A and B',
          'None of the above'
        ],
        correctAnswerIndex: 2,
        explanation: 'Both `@ResponseStatus(HttpStatus.CREATED)` on a method and `ResponseEntity.status(201)` allow returning a 201 status code.',
        topic: 'Spring REST'
      }
    ]
  },
  {
    id: 'quiz-docker-kafka',
    title: 'Docker, Kafka & DevOps for Java',
    iconName: 'Box',
    description: 'Evaluate your understanding of containerization, Kafka topics, and cloud deployments.',
    questionCount: 3,
    questions: [
      {
        id: 'dq1',
        question: 'In Apache Kafka, what represents a stream of messages belonging to a particular category?',
        options: ['Partition', 'Topic', 'Broker', 'Consumer Group'],
        correctAnswerIndex: 1,
        explanation: 'A Topic is a logical category or feed name to which records are published in Kafka.',
        topic: 'Kafka Architecture'
      },
      {
        id: 'dq2',
        question: 'Which Docker command builds an image from a Dockerfile in the current directory?',
        options: ['docker run .', 'docker build -t app-name .', 'docker compile .', 'docker image create'],
        correctAnswerIndex: 1,
        explanation: '`docker build -t image_name .` packages the context into a Docker container image.',
        topic: 'Docker CLI'
      },
      {
        id: 'dq3',
        question: 'What is the purpose of Docker Multi-Stage builds for Java applications?',
        options: [
          'To run multiple JVMs in one container',
          'To compile Maven/Gradle in stage 1 and produce a tiny JRE runtime image in stage 2',
          'To connect to multiple databases',
          'To auto-restart containers'
        ],
        correctAnswerIndex: 1,
        explanation: 'Multi-stage builds allow separating build tools (JDK) from runtime binaries (JRE), dramatically reducing container size.',
        topic: 'Docker Optimization'
      }
    ]
  }
];
