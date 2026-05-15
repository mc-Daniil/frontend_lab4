"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetakeExam = exports.KamyninStrategy = exports.GorbatovaStrategy = exports.GoryachevStrategy = exports.TelyakovskiyStrategy = void 0;
class TeacherRetakeStrategy {
    constructor(teacherName, teacherDifficulty) {
        this.teacherName = teacherName;
        this.teacherDifficulty = teacherDifficulty;
    }
    pass(student, subject, examSystem) {
        const difficulty = this.teacherDifficulty + examSystem.getSubjectDifficulty(subject);
        const score = student.knowledgeLevel - student.nervousnessLevel - difficulty;
        let status;
        if (score >= 3) {
            status = "Студент сдал";
        }
        else if (score >= 0) {
            status = "Студент отправлен на комиссию";
        }
        else {
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
class TelyakovskiyStrategy extends TeacherRetakeStrategy {
    constructor() {
        super("Теляковский", 2);
    }
}
exports.TelyakovskiyStrategy = TelyakovskiyStrategy;
class GoryachevStrategy extends TeacherRetakeStrategy {
    constructor() {
        super("Горячев", 1);
    }
}
exports.GoryachevStrategy = GoryachevStrategy;
class GorbatovaStrategy extends TeacherRetakeStrategy {
    constructor() {
        super("Горбатова", 1);
    }
}
exports.GorbatovaStrategy = GorbatovaStrategy;
class KamyninStrategy extends TeacherRetakeStrategy {
    constructor() {
        super("Камынин", 0);
    }
}
exports.KamyninStrategy = KamyninStrategy;
class RetakeExam {
    constructor(strategy, examSystem) {
        this.strategy = strategy;
        this.examSystem = examSystem;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    setExamSystem(examSystem) {
        this.examSystem = examSystem;
    }
    conduct(student, subject) {
        return this.strategy.pass(student, subject, this.examSystem);
    }
}
exports.RetakeExam = RetakeExam;
