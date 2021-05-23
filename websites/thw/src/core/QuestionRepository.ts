import { Question } from "./Question";

export { Answer } from "./Answer";
export { Question } from "./Question";

const STORAGE_LAST_ANSWERED_KEY = "LAST_ANSWERED_QUESTION";

export class QuestionRepository {
  protected readonly questions: Question[];
  protected cursor: number;

  constructor() {
    this.questions = [];
    this.cursor = 0;
  }

  public saveCurrentQuestionCursor() {
    window.localStorage.setItem(
      STORAGE_LAST_ANSWERED_KEY,
      this.cursor.toString()
    );
  }

  public activateLastAnsweredQuestion() {
    const value = window.localStorage.getItem(STORAGE_LAST_ANSWERED_KEY);

    if (value == null) {
      this.cursor = 0;
      return;
    }

    this.cursor = parseInt(value);
  }

  public addQuestion(question: Question) {
    this.questions.push(question);
  }

  public setCursor(cursor: number) {
    this.cursor = cursor;
  }

  public setCursorByValue(question: Question) {
    const index = this.questions.findIndex((inner) => inner === question);

    if (index >= 0) {
      this.setCursor(index);
    }
  }

  public current() {
    return this.questions[this.cursor];
  }

  public next() {
    if (this.cursor === this.questions.length - 1) {
      this.cursor = 0;
    } else {
      ++this.cursor;
    }

    return this.current();
  }

  public previous() {
    if (this.cursor === 0) {
      this.cursor = this.questions.length - 1;
    } else {
      this.cursor--;
    }

    return this.current();
  }

  public getAll() {
    return this.questions;
  }

  public random() {
    const max = this.questions.length - 1;
    const min = 0;

    this.cursor = Math.floor(Math.random() * (max - min + 1) + min);

    return this.current();
  }
}
