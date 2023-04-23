import { IChapter } from "./chapter.interface";
import { ITest } from "./test.interface";

export interface IPakal {
  _id?: string;
  pdf: string;
  chapters: string[] | IChapter[];
  test?: string | ITest;
}
