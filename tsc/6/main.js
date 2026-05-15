"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("./adapter");
const observer_1 = require("./observer");
const strategy_1 = require("./strategy");
function printResult(result) {
    console.log("-----");
    console.log(`Студент: ${result.student.name}`);
    console.log(`Предмет: ${result.subject.name}`);
    console.log(`Преподаватель: ${result.teacherName}`);
    console.log(`Формат: ${result.examType}`);
    console.log(`Итог: ${result.score}`);
    console.log(`Результат: ${result.status}`);
}
function notifyDeanOffice(publisher, result) {
    publisher.notify(`${result.student.name}: ${result.status}. Предмет: ${result.subject.name}`);
}
const mathAnalysis = { name: "Матанализ" };
const differentialEquations = { name: "Диффуры" };
const complexAnalysis = { name: "ТФКП" };
const student1 = {
    name: "Студент с крепкими нервами",
    knowledgeLevel: 7,
    nervousnessLevel: 1
};
const student2 = {
    name: "Студент после бессонной ночи",
    knowledgeLevel: 5,
    nervousnessLevel: 3
};
const student3 = {
    name: "Студент, который видел Демидовича только во сне",
    knowledgeLevel: 2,
    nervousnessLevel: 3
};
const student4 = {
    name: "Студент, который почти понял ТФКП",
    knowledgeLevel: 4,
    nervousnessLevel: 2
};
const writtenExam = new adapter_1.WrittenExamSystem();
const oralExamSystem = new adapter_1.OralExamSystem();
const oralExamAdapter = new adapter_1.OralToWrittenExamAdapter(oralExamSystem);
const publisher = new observer_1.RetakePublisher();
const deanOffice = new observer_1.DeanOffice();
publisher.subscribe(deanOffice);
const retakeExam = new strategy_1.RetakeExam(new strategy_1.TelyakovskiyStrategy(), oralExamAdapter);
let result;
result = retakeExam.conduct(student1, mathAnalysis);
printResult(result);
notifyDeanOffice(publisher, result);
retakeExam.setStrategy(new strategy_1.GoryachevStrategy());
retakeExam.setExamSystem(writtenExam);
result = retakeExam.conduct(student2, differentialEquations);
printResult(result);
notifyDeanOffice(publisher, result);
retakeExam.setStrategy(new strategy_1.GorbatovaStrategy());
retakeExam.setExamSystem(writtenExam);
result = retakeExam.conduct(student4, complexAnalysis);
printResult(result);
notifyDeanOffice(publisher, result);
retakeExam.setStrategy(new strategy_1.KamyninStrategy());
retakeExam.setExamSystem(oralExamAdapter);
result = retakeExam.conduct(student3, complexAnalysis);
printResult(result);
notifyDeanOffice(publisher, result);
