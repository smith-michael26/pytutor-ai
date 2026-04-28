export type TopicStatus = "done" | "active" | "in-progress" | "locked";

export interface Topic {
  id: number;
  title: string;
  status: TopicStatus;
  duration: string;
  level: "Beginner" | "Intermediate";
}

export const topics: Topic[] = [
  {
    id: 1,
    title: "Intro to Python",
    status: "done",
    duration: "15 mins",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Variables",
    status: "done",
    duration: "20 mins",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Control Flow",
    status: "active",
    duration: "20 mins",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Functions",
    status: "in-progress",
    duration: "25 mins",
    level: "Beginner",
  },
  {
    id: 5,
    title: "Lists & Tuples",
    status: "locked",
    duration: "25 mins",
    level: "Beginner",
  },
  {
    id: 6,
    title: "Dictionaries",
    status: "locked",
    duration: "20 mins",
    level: "Beginner",
  },
  {
    id: 7,
    title: "File Handling",
    status: "locked",
    duration: "30 mins",
    level: "Intermediate",
  },
  {
    id: 8,
    title: "OOP Basics",
    status: "locked",
    duration: "35 mins",
    level: "Intermediate",
  },
];
