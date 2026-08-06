import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS_DATA: InterviewQuestion[] = [
  {
    id: 'iq-diff-hashmap-concurrenthashmap',
    question: 'What is the difference between HashMap and ConcurrentHashMap in Java?',
    category: 'Core Java & Collections',
    level: 'Mid-Level',
    popularInCompanies: ['Amazon', 'Oracle', 'TCS', 'Infosys', 'Capgemini'],
    answer: `1. **Thread Safety**: \`HashMap\` is not thread-safe. Concurrent modifications can cause infinite loops or data corruption. \`ConcurrentHashMap\` is designed for high-concurrency multi-threaded access.
2. **Locking Mechanism**: \`HashMap\` has no locking. \`Hashtable\` or \`Collections.synchronizedMap\` locks the entire map for every read/write. \`ConcurrentHashMap\` uses Segmented Locking (bucket level locks) or CAS (Compare-And-Swap) operations in Java 8+, allowing concurrent reads without blocking.
3. **Null Values**: \`HashMap\` allows one null key and multiple null values. \`ConcurrentHashMap\` DOES NOT allow null keys or null values (throws NullPointerException).`,
    codeSnippet: `import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class ConcurrentMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> stockMap = new ConcurrentHashMap<>();
        stockMap.put("AAPL", 220);
        stockMap.put("GOOGL", 180);
        
        // Atomic computeIfAbsent
        stockMap.computeIfAbsent("MSFT", k -> 400);
        
        System.out.println("Stock Inventory: " + stockMap);
    }
}`,
    expectedOutput: `Stock Inventory: {AAPL=220, GOOGL=180, MSFT=400}`
  },
  {
    id: 'iq-spring-bean-scopes',
    question: 'Explain the Bean Scopes supported in Spring Framework.',
    category: 'Spring Boot',
    level: 'Fresher',
    popularInCompanies: ['Wipro', 'Accenture', 'Cognizant', 'HCL'],
    answer: `Spring supports 5 core bean scopes:
1. **singleton** (Default): A single shared instance per Spring IoC Container.
2. **prototype**: A new bean instance is created every time requested.
3. **request** (Web): Single bean instance per HTTP request lifecycle.
4. **session** (Web): Single bean instance per HTTP Session.
5. **application** (Web): Scoped to the lifecycle of a ServletContext.`
  },
  {
    id: 'iq-multithreading-volatile',
    question: 'What is the "volatile" keyword in Java and when should it be used?',
    category: 'Multithreading',
    level: 'Mid-Level',
    popularInCompanies: ['Goldman Sachs', 'Morgan Stanley', 'JPMorgan', 'Walmart'],
    answer: `The \`volatile\` keyword guarantees **visibility** of changes to variables across threads. 

- When a thread modifies a \`volatile\` variable, the value is written directly to **Main Memory** rather than kept in CPU cache memory.
- When another thread reads the variable, it reads directly from Main Memory.
- **Note**: \`volatile\` guarantees visibility, but does NOT guarantee atomicity for compound operations like \`count++\`. For atomicity, use \`AtomicInteger\` or \`synchronized\` locks.`
  },
  {
    id: 'iq-java-stream-api-map-flatmap',
    question: 'What is the difference between map() and flatMap() in Java Stream API?',
    category: 'Core Java & Functional',
    level: 'Mid-Level',
    popularInCompanies: ['Standard Chartered', 'Barclays', 'Tech Mahindra'],
    answer: `- **map()**: Performs 1-to-1 transformation. Takes a function \`T -> R\` and transforms a Stream of \`T\` into a Stream of \`R\`.
- **flatMap()**: Performs 1-to-Many transformation (flattens nested structures). Takes a function \`T -> Stream<R>\` and flattens multiple streams into a single combined stream.`,
    codeSnippet: `import java.util.*;
import java.util.stream.Collectors;

public class MapVsFlatMap {
    public static void main(String[] args) {
        List<List<String>> nestedNames = Arrays.asList(
            Arrays.asList("Java", "Spring"),
            Arrays.asList("HTML", "CSS", "JS")
        );
        
        // flatMap flattens List<List<String>> into List<String>
        List<String> allTechs = nestedNames.stream()
            .flatMap(Collection::stream)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
            
        System.out.println("Flattened Tech Stack: " + allTechs);
    }
}`,
    expectedOutput: `Flattened Tech Stack: [JAVA, SPRING, HTML, CSS, JS]`
  },
  {
    id: 'iq-solid-principles-java',
    question: 'Explain SOLID Principles in Java Object-Oriented Design.',
    category: 'System Design & OOP',
    level: 'Senior/Lead',
    popularInCompanies: ['Microsoft', 'Uber', 'PayPal', 'Adobe'],
    answer: `SOLID stands for:
1. **S** - Single Responsibility Principle (A class should have only one reason to change).
2. **O** - Open/Closed Principle (Software entities should be open for extension, but closed for modification).
3. **L** - Liskov Substitution Principle (Subtypes must be substitutable for their base types without breaking code).
4. **I** - Interface Segregation Principle (Clients shouldn't be forced to depend on methods they do not use).
5. **D** - Dependency Inversion Principle (Depend upon abstractions, not concrete implementations).`
  }
];
