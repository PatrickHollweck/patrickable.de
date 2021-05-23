import { Answer } from "./Answer";

import { QuestionStorage } from "./QuestionStorage";

export class Question {
  public readonly questionID: string;
  public readonly questionText: string;
  public readonly category: string;

  public readonly storage: QuestionStorage;

  public readonly answers: Answer[];

  constructor(questionText: string, answers: Answer[], category: string) {
    this.category = category;
    const matches = questionText.match(/(\d+.\d+)\s+(.+)/);
    this.questionID = matches![1];
    this.questionText = matches![2];

    this.answers = [];

    for (const answer of answers) {
      this.answers.push(answer);
    }

    this.storage = new QuestionStorage(this);
  }
}
