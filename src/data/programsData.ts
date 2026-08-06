import { LogicalProgram } from '../types';

export const LOGICAL_PROGRAMS_DATA: LogicalProgram[] = [
  {
    id: 'prog-star-pyramid-pattern',
    title: 'Print Pyramid Star Pattern in Java',
    slug: 'print-pyramid-star-pattern-java',
    category: 'patterns',
    difficulty: 'Beginner',
    description: 'A classic nested loop pattern program that prints a balanced pyramid star pattern for a given number of rows.',
    javaCode: `public class PyramidPattern {
    public static void main(String[] args) {
        int rows = 5;
        System.out.println("Pyramid Pattern for " + rows + " rows:\n");
        
        for (int i = 1; i <= rows; i++) {
            // Print leading spaces
            for (int j = i; j < rows; j++) {
                System.out.print(" ");
            }
            // Print stars
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
    expectedOutput: `Pyramid Pattern for 5 rows:

    *
   ***
  *****
 *******
*********`,
    timeComplexity: 'O(N^2)',
    spaceComplexity: 'O(1)',
    tags: ['Patterns', 'Loops', 'Beginner', 'Star Pattern']
  },
  {
    id: 'prog-reverse-string',
    title: 'Reverse a String in Java Without Using Built-in Reverse Method',
    slug: 'reverse-string-in-java',
    category: 'strings',
    difficulty: 'Beginner',
    description: 'Learn how to reverse a string in Java using a character array loop, StringBuilder, and recursion.',
    javaCode: `public class StringReversal {
    public static void main(String[] args) {
        String original = "JavaCodePoint";
        
        // Approach 1: Using char array loop
        char[] charArray = original.toCharArray();
        String reversed = "";
        for (int i = charArray.length - 1; i >= 0; i--) {
            reversed += charArray[i];
        }
        
        // Approach 2: Two-Pointer Swap
        char[] arr = original.toCharArray();
        int left = 0, right = arr.length - 1;
        while (left < right) {
            char temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        String swappedString = new String(arr);
        
        System.out.println("Original String : " + original);
        System.out.println("Reversed (Loop) : " + reversed);
        System.out.println("Reversed (Swap) : " + swappedString);
    }
}`,
    expectedOutput: `Original String : JavaCodePoint
Reversed (Loop) : tnioPedoCavaJ
Reversed (Swap) : tnioPedoCavaJ`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    tags: ['Strings', 'Algorithms', 'Interview Questions', 'Two Pointers']
  },
  {
    id: 'prog-palindrome-check',
    title: 'Check If a String or Number is Palindrome in Java',
    slug: 'palindrome-check-java',
    category: 'strings',
    difficulty: 'Beginner',
    description: 'Determine whether a word or number reads the same backward as forward (e.g., "radar", 12321).',
    javaCode: `public class PalindromeChecker {
    public static void main(String[] args) {
        String inputStr = "radar";
        int inputNum = 12321;
        
        boolean isStrPalindrome = checkStringPalindrome(inputStr);
        boolean isNumPalindrome = checkNumberPalindrome(inputNum);
        
        System.out.println("Is '" + inputStr + "' a Palindrome? " + isStrPalindrome);
        System.out.println("Is '" + inputNum + "' a Palindrome? " + isNumPalindrome);
    }
    
    private static boolean checkStringPalindrome(String str) {
        int left = 0, right = str.length() - 1;
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
    
    private static boolean checkNumberPalindrome(int num) {
        int original = num;
        int reversed = 0;
        while (num > 0) {
            int digit = num % 10;
            reversed = reversed * 10 + digit;
            num /= 10;
        }
        return original == reversed;
    }
}`,
    expectedOutput: `Is 'radar' a Palindrome? true
Is '12321' a Palindrome? true`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    tags: ['Strings', 'Math', 'Palindrome', 'Logic']
  },
  {
    id: 'prog-fibonacci-recursion',
    title: 'Fibonacci Series in Java (Iterative & Recursive)',
    slug: 'fibonacci-series-java',
    category: 'recursion',
    difficulty: 'Beginner',
    description: 'Generate the Fibonacci sequence (0, 1, 1, 2, 3, 5, 8, 13...) using both iterative loop and recursive function calls.',
    javaCode: `public class FibonacciExample {
    public static void main(String[] args) {
        int count = 10;
        System.out.print("Fibonacci (Iterative) up to " + count + " terms: ");
        printFibonacciIterative(count);
        
        System.out.print("\nFibonacci 10th Term (Recursive): " + fibonacciRecursive(9));
    }
    
    private static void printFibonacciIterative(int n) {
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            System.out.print(a + " ");
            int next = a + b;
            a = b;
            b = next;
        }
    }
    
    private static int fibonacciRecursive(int n) {
        if (n <= 1) return n;
        return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    }
}`,
    expectedOutput: `Fibonacci (Iterative) up to 10 terms: 0 1 1 2 3 5 8 13 21 34 
Fibonacci 10th Term (Recursive): 34`,
    timeComplexity: 'O(N) Iterative, O(2^N) Naive Recursion',
    spaceComplexity: 'O(1) Iterative',
    tags: ['Recursion', 'Math', 'Fibonacci', 'Beginner']
  },
  {
    id: 'prog-array-duplicates',
    title: 'Find Duplicate Elements in an Array in Java',
    slug: 'find-duplicate-elements-array-java',
    category: 'arrays',
    difficulty: 'Intermediate',
    description: 'Identify and print all repeated values in an integer or string array using HashSet and Stream API.',
    javaCode: `import java.util.*;

public class FindDuplicates {
    public static void main(String[] args) {
        int[] numbers = {4, 3, 2, 7, 8, 2, 3, 1, 4};
        
        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new HashSet<>();
        
        for (int num : numbers) {
            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }
        
        System.out.println("Original Array: " + Arrays.toString(numbers));
        System.out.println("Duplicate Elements Found: " + duplicates);
    }
}`,
    expectedOutput: `Original Array: [4, 3, 2, 7, 8, 2, 3, 1, 4]
Duplicate Elements Found: [2, 3, 4]`,
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    tags: ['Arrays', 'HashSet', 'Collections', 'Intermediate']
  },
  {
    id: 'prog-check-anagram',
    title: 'Check If Two Strings Are Anagrams in Java',
    slug: 'check-anagram-strings-java',
    category: 'strings',
    difficulty: 'Intermediate',
    description: 'An anagram is a word formed by rearranging the letters of another (e.g., "listen" and "silent").',
    javaCode: `import java.util.Arrays;

public class AnagramChecker {
    public static void main(String[] args) {
        String str1 = "Listen";
        String str2 = "Silent";
        
        boolean isAnagram = isAnagram(str1, str2);
        System.out.println("Are '" + str1 + "' and '" + str2 + "' Anagrams? " + isAnagram);
    }
    
    public static boolean isAnagram(String s1, String s2) {
        String cleanS1 = s1.replaceAll("\\s", "").toLowerCase();
        String cleanS2 = s2.replaceAll("\\s", "").toLowerCase();
        
        if (cleanS1.length() != cleanS2.length()) return false;
        
        char[] a1 = cleanS1.toCharArray();
        char[] a2 = cleanS2.toCharArray();
        
        Arrays.sort(a1);
        Arrays.sort(a2);
        
        return Arrays.equals(a1, a2);
    }
}`,
    expectedOutput: `Are 'Listen' and 'Silent' Anagrams? true`,
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    tags: ['Strings', 'Sorting', 'Arrays', 'Anagram']
  }
];
