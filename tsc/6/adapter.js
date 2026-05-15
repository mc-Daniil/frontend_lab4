"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OralToWrittenExamAdapter = exports.OralExamSystem = exports.WrittenExamSystem = void 0;
class WrittenExamSystem {
    getExamType() {
        return "письменный экзамен";
    }
    getSubjectDifficulty(subject) {
        if (subject.name === "Диффуры") {
            return 1;
        }
        return 0;
    }
}
exports.WrittenExamSystem = WrittenExamSystem;
class OralExamSystem {
    getOralExamType() {
        return "устный экзамен";
    }
    getOralSubjectDifficulty(subject) {
        if (subject.name === "Диффуры") {
            return 0;
        }
        return 1;
    }
}
exports.OralExamSystem = OralExamSystem;
class OralToWrittenExamAdapter {
    constructor(oralExamSystem) {
        this.oralExamSystem = oralExamSystem;
    }
    getExamType() {
        return this.oralExamSystem.getOralExamType() + " через Adapter";
    }
    getSubjectDifficulty(subject) {
        return this.oralExamSystem.getOralSubjectDifficulty(subject);
    }
}
exports.OralToWrittenExamAdapter = OralToWrittenExamAdapter;
