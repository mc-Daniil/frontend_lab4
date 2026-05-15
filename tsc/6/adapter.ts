import { ExamSystem, Subject } from "./strategy";

export class WrittenExamSystem implements ExamSystem {
  getExamType(): string {
    return "письменный экзамен";
  }

  getSubjectDifficulty(subject: Subject): number {
    if (subject.name === "Диффуры") {
      return 1;
    }

    return 0;
  }
}

export class OralExamSystem {
  getOralExamType(): string {
    return "устный экзамен";
  }

  getOralSubjectDifficulty(subject: Subject): number {
    if (subject.name === "Диффуры") {
      return 0;
    }

    return 1;
  }
}

export class OralToWrittenExamAdapter implements ExamSystem {
  private oralExamSystem: OralExamSystem;

  constructor(oralExamSystem: OralExamSystem) {
    this.oralExamSystem = oralExamSystem;
  }

  getExamType(): string {
    return this.oralExamSystem.getOralExamType() + " через Adapter";
  }

  getSubjectDifficulty(subject: Subject): number {
    return this.oralExamSystem.getOralSubjectDifficulty(subject);
  }
}