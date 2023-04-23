export interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ITest {
  _id?: string;
  questions: IQuestion[];
}
