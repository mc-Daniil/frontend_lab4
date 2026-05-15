export type SubjectName = "Матанализ" | "Диффуры" | "ТФКП";

export type Student = {
  name: string;
  knowledgeLevel: number;
  nervousnessLevel: number;
};

export type Subject = {
  name: SubjectName;
};

export type RetakeStatus =
  | "Студент сдал"
  | "Студент отправлен на комиссию"
  | "Студент отправлен в подвал Т-корпуса";

export type RetakeResult = {
  student: Student;
  subject: Subject;
  teacherName: string;
  examType: string;
  score: number;
  status: RetakeStatus;
};

export interface ExamSystem {
  getExamType(): string;
  getSubjectDifficulty(subject: Subject): number;
}

export interface RetakeStrategy {
  teacherName: string;
  teacherDifficulty: number;

  pass(student: Student, subject: Subject, examSystem: ExamSystem): RetakeResult;
}

class TeacherRetakeStrategy implements RetakeStrategy {
  teacherName: string;
  teacherDifficulty: number;

  constructor(teacherName: string, teacherDifficulty: number) {
    this.teacherName = teacherName;
    this.teacherDifficulty = teacherDifficulty;
  }

  pass(student: Student, subject: Subject, examSystem: ExamSystem): RetakeResult {
    const difficulty: number =
      this.teacherDifficulty + examSystem.getSubjectDifficulty(subject);

    const score: number =
      student.knowledgeLevel - student.nervousnessLevel - difficulty;

    let status: RetakeStatus;

    if (score >= 3) {
      status = "Студент сдал";
    } else if (score >= 0) {
      status = "Студент отправлен на комиссию";
    } else {
      status = "Студент отправлен в подвал Т-корпуса";
    }

    return {
      student: student,
      subject: subject,
      teacherName: this.teacherName,
      examType: examSystem.getExamType(),
      score: score,
      status: status
    };
  }
}

export class TelyakovskiyStrategy extends TeacherRetakeStrategy {
  constructor() {
    super("Теляковский", 2);
  }
}

export class GoryachevStrategy extends TeacherRetakeStrategy {
  constructor() {
    super("Горячев", 1);
  }
}

export class GorbatovaStrategy extends TeacherRetakeStrategy {
  constructor() {
    super("Горбатова", 1);
  }
}

export class KamyninStrategy extends TeacherRetakeStrategy {
  constructor() {
    super("Камынин", 0);
  }
}

export class RetakeExam {
  private strategy: RetakeStrategy;
  private examSystem: ExamSystem;

  constructor(strategy: RetakeStrategy, examSystem: ExamSystem) {
    this.strategy = strategy;
    this.examSystem = examSystem;
  }

  setStrategy(strategy: RetakeStrategy): void {
    this.strategy = strategy;
  }

  setExamSystem(examSystem: ExamSystem): void {
    this.examSystem = examSystem;
  }

  conduct(student: Student, subject: Subject): RetakeResult {
    return this.strategy.pass(student, subject, this.examSystem);
  }
}