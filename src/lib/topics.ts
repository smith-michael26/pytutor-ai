export type TopicStatus = "done" | "active" | "in-progress" | "locked";

export interface Topic {
  id: number;
  title: string;
  status: TopicStatus;
  duration: string;
  level: "Beginner" | "Intermediate";
}

export function buildTopicsFromLessons(
  lessons: {
    topic_id: number;
    title: string;
    duration: string;
    level: string;
  }[],
  completedIds: number[] = [],
  activeId: number = 1,
): Topic[] {
  return lessons.map((lesson) => {
    let status: TopicStatus = "locked";

    if (completedIds.includes(lesson.topic_id)) {
      status = "done";
    } else if (lesson.topic_id === activeId) {
      status = "active";
    } else if (lesson.topic_id < activeId) {
      status = "in-progress";
    }

    return {
      id: lesson.topic_id,
      title: lesson.title,
      duration: lesson.duration,
      level: lesson.level as "Beginner" | "Intermediate",
      status,
    };
  });
}
