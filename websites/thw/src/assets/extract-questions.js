/** This script extracts the questions from a text file that extracted the text content of the original pdf question file */

// @NOTE : THIS SCRIPT DOES NOT EXTRACT PERFECTLY AND IS ONLY MEANT AS A JUMPING OFF POINT,
//         ALSO YOU NEED TO DOUBLE CHECK IF THE QUESTIONS ARE ACTUALLY CORRECT!
//         MANUAL FIXES HAVE BEEN MADE TO THE RESULTUNG QUESTIONS.JSON IF YOU RUN THIS SCRIPT
//         AGAIN YOU WILL OVERRIDE THOSE!

const fs = require("fs");

const file = fs.readFileSync("./GA-Theorieaufgaben_V 3.2_04.19.txt").toString();
const lines = file.split("\n");

function isQuestionStart(text) {
  return /\d\.\d/gm.test(text.trim());
}

function normalizeText(text) {
  return text
    .trim()
    .normalize()
    .replace(/[\x00-\x1F\x7F-\x9F]/g, "");
}

function parseQuestionAnswer(lines, start, answersStartIndex = 0) {
  const result = {
    checked: normalizeText(lines[start + 1]) === "X",
  };

  for (let index = start; index >= 0; index--) {
    const currentLine = lines[index].trim();

    if (
      index != start &&
      (currentLine === "A" ||
        currentLine === "B" ||
        index == answersStartIndex ||
        currentLine === "C" ||
        currentLine === "X")
    ) {
      result.text = normalizeText(lines.slice(index + 1, start).join(" "));
      return result;
    }
  }
}

const questions = [];

for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
  const line = lines[lineIndex];

  if (isQuestionStart(line)) {
    const question = {
      answers: {},
    };

    for (
      let questionIndex = lineIndex;
      questionIndex < lines.length;
      questionIndex++
    ) {
      const questionLine = lines[questionIndex];

      if (questionLine.trim() === "A") {
        question.question = normalizeText(
          lines.slice(lineIndex, questionIndex - 1).join(" ")
        );

        question.answers.A = parseQuestionAnswer(
          lines,
          questionIndex,
          questionIndex - 2
        );

        continue;
      }

      if (questionLine.trim() === "B") {
        question.answers.B = parseQuestionAnswer(lines, questionIndex);
      }

      if (questionLine.trim() === "C") {
        question.answers.C = parseQuestionAnswer(lines, questionIndex);
        lineIndex = questionIndex + 1;
        questions.push(question);
        break;
      }
    }
  }
}

for (const question of questions) {
  switch (question.question.match(/(\d+)/)[0]) {
    case "1":
      question.category =
        "Das THW im Gefüge des Zivil- und Katastrophenschutzes";
      break;
    case "2":
      question.category = "Arbeitssicherheit und Gesundheitsschutz";
      break;
    case "3":
      question.category =
        "Arbeiten mit Leinen, Drahtseilen, Ketten, Rund- und Bandschlingen";
      break;
    case "4":
      question.category = "Arbeiten mit Leitern";
      break;
    case "5":
      question.category = "Stromerzeugung und Beleuchtung";
      break;
    case "6":
      question.category = "Metall-, Holz- und Steinbearbeitung";
      break;
    case "7":
      question.category = "Bewegen von Lasten";
      break;
    case "8":
      question.category = "Arbeiten am und auf dem Wasser";
      break;
    case "9":
      question.category = "Einsatzgrundlagen";
      break;
    case "10":
      question.category = "Grundlagen der Rettung und Bergung";
      break;
    default:
      question.category = "unknown";
      break;
  }
}

const outputPath = "./questions.json";

if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
}

fs.writeFileSync(outputPath, JSON.stringify(questions, null, 4), "utf-8");
