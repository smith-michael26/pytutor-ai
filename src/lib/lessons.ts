export interface CodeExample {
  code: string;
  language?: string;
}

export interface LessonSection {
  type: "text" | "code" | "hint";
  content: string;
}

export interface Lesson {
  topicId: number;
  title: string;
  duration: string;
  level: "Beginner" | "Intermediate";
  sections: LessonSection[];
}

export const lessons: Record<number, Lesson> = {
  1: {
    topicId: 1,
    title: "Introduction to Python",
    duration: "15 mins",
    level: "Beginner",
    sections: [
      {
        type: "text",
        content:
          "Python is a high-level, beginner-friendly programming language known for its clean and readable syntax. It is widely used in web development, data science, AI, and automation.",
      },
      {
        type: "hint",
        content:
          "Python uses indentation (spaces) to define blocks of code. Always use 4 spaces — never mix tabs and spaces.",
      },
      {
        type: "text",
        content:
          "Your first Python program is simple. The print() function outputs text to the screen.",
      },
      {
        type: "code",
        content: `# My first Python program\nprint("Hello, World!")`,
      },
    ],
  },

  2: {
    topicId: 2,
    title: "Variables & Data Types",
    duration: "20 mins",
    level: "Beginner",
    sections: [
      {
        type: "text",
        content:
          "A variable is a named container that stores a value. In Python, you do not need to declare a type — Python figures it out automatically.",
      },
      {
        type: "code",
        content: `name = "Abdullahi"   # string\nage = 20             # integer\ngpa = 3.75           # float\nis_student = True    # boolean\n\nprint(name, age, gpa, is_student)`,
      },
      {
        type: "hint",
        content:
          "Use descriptive variable names. 'student_age' is better than 'x'. Python variable names are case-sensitive.",
      },
      {
        type: "text",
        content:
          "You can check the type of any variable using the built-in type() function.",
      },
      {
        type: "code",
        content: `print(type(name))    # <class 'str'>\nprint(type(age))     # <class 'int'>`,
      },
    ],
  },

  3: {
    topicId: 3,
    title: "Control Flow — if / elif / else",
    duration: "20 mins",
    level: "Beginner",
    sections: [
      {
        type: "text",
        content:
          "Control flow lets your program make decisions. The if statement runs a block of code only when a condition is true. If the condition is false, the else block runs instead.",
      },
      {
        type: "code",
        content: `age = 18\n\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a minor")`,
      },
      {
        type: "hint",
        content:
          "Indentation is critical here. The code inside an if block must be indented by exactly 4 spaces or it will throw an IndentationError.",
      },
      {
        type: "text",
        content:
          "Use elif to check multiple conditions one after another. Python stops checking as soon as one condition is true.",
      },
      {
        type: "code",
        content: `score = 72\n\nif score >= 70:\n    print("Pass")\nelif score >= 50:\n    print("Borderline")\nelse:\n    print("Fail")`,
      },
    ],
  },

  4: {
    topicId: 4,
    title: "Functions",
    duration: "25 mins",
    level: "Beginner",
    sections: [
      {
        type: "text",
        content:
          "A function is a reusable block of code that performs a specific task. You define it once and call it as many times as you need.",
      },
      {
        type: "code",
        content: `def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Abdullahi")\ngreet("Unilorin")`,
      },
      {
        type: "hint",
        content:
          "Functions that use 'return' give back a value. Functions without 'return' simply perform an action and return None.",
      },
      {
        type: "code",
        content: `def add(a, b):\n    return a + b\n\nresult = add(10, 5)\nprint(result)  # 15`,
      },
    ],
  },

  5: {
    topicId: 5,
    title: "Lists & Tuples",
    duration: "25 mins",
    level: "Beginner",
    sections: [
      {
        type: "text",
        content:
          "A list is an ordered, changeable collection of items. Lists are written with square brackets and can hold any data type.",
      },
      {
        type: "code",
        content: `fruits = ["apple", "mango", "banana"]\n\nprint(fruits[0])   # apple\nfruits.append("orange")\nprint(fruits)`,
      },
      {
        type: "hint",
        content:
          "Lists are mutable — you can change them. Tuples use round brackets () and are immutable — you cannot change them after creation.",
      },
      {
        type: "code",
        content: `# Tuple — cannot be changed\ncoordinates = (6.5244, 3.3792)\nprint(coordinates[0])`,
      },
    ],
  },

  6: {
    topicId: 6,
    title: "Dictionaries",
    duration: "20 mins",
    level: "Beginner",
    sections: [
      {
        type: "text",
        content:
          "A dictionary stores data as key-value pairs. You access a value using its key, not an index number.",
      },
      {
        type: "code",
        content: `student = {\n    "name": "Abdullahi",\n    "level": 300,\n    "gpa": 4.2\n}\n\nprint(student["name"])  # Abdullahi\nstudent["gpa"] = 4.5\nprint(student)`,
      },
      {
        type: "hint",
        content:
          "Use .get() to safely access a key — it returns None instead of throwing an error if the key doesn't exist.",
      },
    ],
  },

  7: {
    topicId: 7,
    title: "File Handling",
    duration: "30 mins",
    level: "Intermediate",
    sections: [
      {
        type: "text",
        content:
          "Python can read from and write to files on your computer. The open() function is used to open a file, and you should always close it after use.",
      },
      {
        type: "code",
        content: `# Writing to a file\nwith open("notes.txt", "w") as f:\n    f.write("Hello from Python!")\n\n# Reading from a file\nwith open("notes.txt", "r") as f:\n    content = f.read()\n    print(content)`,
      },
      {
        type: "hint",
        content:
          "Always use 'with open(...)' — it automatically closes the file even if an error occurs, preventing data loss.",
      },
    ],
  },

  8: {
    topicId: 8,
    title: "OOP Basics",
    duration: "35 mins",
    level: "Intermediate",
    sections: [
      {
        type: "text",
        content:
          "Object-Oriented Programming (OOP) lets you model real-world things as objects. A class is a blueprint; an object is an instance of that blueprint.",
      },
      {
        type: "code",
        content: `class Student:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\n\n    def introduce(self):\n        print(f"I am {self.name}, Level {self.level}")\n\ns1 = Student("Abdullahi", 300)\ns1.introduce()`,
      },
      {
        type: "hint",
        content:
          "__init__ is the constructor — it runs automatically when you create a new object. 'self' refers to the current object instance.",
      },
    ],
  },
};
