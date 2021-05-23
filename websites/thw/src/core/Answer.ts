export class Answer {
  public readonly key: string;
  public readonly text: string;
  public readonly correctValue: boolean;

  constructor(key: string, text: string, correctValue: boolean) {
    this.key = key;
    this.text = text;
    this.correctValue = correctValue;
  }
}
