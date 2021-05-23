import { Question } from "./Question";

export class QuestionStorage {
  private question: Question;

  constructor(question: Question) {
    this.question = question;
  }

  protected toID() {
    const text = this.question.questionText.replace(" ", "-");

    return `${this.question.questionID}@${text}`;
  }

  public saveAnswerResult(answerStatus: boolean) {
    window.localStorage.setItem(this.toID(), JSON.stringify(answerStatus));
  }

  public getSavedAnswer() {
    const value = window.localStorage.getItem(this.toID());

    if (value == null) {
      return null;
    }

    return JSON.parse(value);
  }

  public hasSavedAnswer() {
    return this.getSavedAnswer() !== null;
  }

  public static reset() {
    window.localStorage.clear();
  }
}
