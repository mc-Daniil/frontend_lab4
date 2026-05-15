import {
  OralExamSystem,
  OralToWrittenExamAdapter,
  WrittenExamSystem
} from "./adapter";

import {
  DeanOffice,
  RetakePublisher
} from "./observer";

import {
  GorbatovaStrategy,
  GoryachevStrategy,
  KamyninStrategy,
  RetakeExam,
  RetakeResult,
  Student,
  Subject,
  TelyakovskiyStrategy
} from "./strategy";

function printResult(result: RetakeResult): void {
  console.log("-----");
  console.log(`Студент: ${result.student.name}`);
  console.log(`Предмет: ${result.subject.name}`);
  console.log(`Преподаватель: ${result.teacherName}`);
  console.log(`Формат: ${result.examType}`);
  console.log(`Итог: ${result.score}`);
  console.log(`Результат: ${result.status}`);
}

function notifyDeanOffice(
  publisher: RetakePublisher,
  result: RetakeResult
): void {
  publisher.notify(
    `${result.student.name}: ${result.status}. Предмет: ${result.subject.name}`
  );
}

const mathAnalysis: Subject = { name: "Матанализ" };
const differentialEquations: Subject = { name: "Диффуры" };
const complexAnalysis: Subject = { name: "ТФКП" };

const student1: Student = {
  name: "Студент с крепкими нервами",
  knowledgeLevel: 7,
  nervousnessLevel: 1
};

const student2: Student = {
  name: "Студент после бессонной ночи",
  knowledgeLevel: 5,
  nervousnessLevel: 3
};

const student3: Student = {
  name: "Студент, который видел Демидовича только во сне",
  knowledgeLevel: 2,
  nervousnessLevel: 3
};

const student4: Student = {
  name: "Студент, который почти понял ТФКП",
  knowledgeLevel: 4,
  nervousnessLevel: 2
};

const writtenExam: WrittenExamSystem = new WrittenExamSystem();

const oralExamSystem: OralExamSystem = new OralExamSystem();
const oralExamAdapter: OralToWrittenExamAdapter =
  new OralToWrittenExamAdapter(oralExamSystem);

const publisher: RetakePublisher = new RetakePublisher();
const deanOffice: DeanOffice = new DeanOffice();

publisher.subscribe(deanOffice);

const retakeExam: RetakeExam =
  new RetakeExam(new TelyakovskiyStrategy(), oralExamAdapter);

let result: RetakeResult;

result = retakeExam.conduct(student1, mathAnalysis);
printResult(result);
notifyDeanOffice(publisher, result);

retakeExam.setStrategy(new GoryachevStrategy());
retakeExam.setExamSystem(writtenExam);

result = retakeExam.conduct(student2, differentialEquations);
printResult(result);
notifyDeanOffice(publisher, result);

retakeExam.setStrategy(new GorbatovaStrategy());
retakeExam.setExamSystem(writtenExam);

result = retakeExam.conduct(student4, complexAnalysis);
printResult(result);
notifyDeanOffice(publisher, result);

retakeExam.setStrategy(new KamyninStrategy());
retakeExam.setExamSystem(oralExamAdapter);

result = retakeExam.conduct(student3, complexAnalysis);
printResult(result);
notifyDeanOffice(publisher, result);