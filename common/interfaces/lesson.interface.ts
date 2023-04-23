import { IChapter } from "./chapter.interface";
import { IItem } from "./item.interface";
import { ITest } from "./test.interface";

export interface ILesson {
  _id?: string;
  goal: string;
  experience: string;
  pdf: string;
  chapters: string[] | IChapter[];
  preKnowledge: string[] | IItem[];
  test?: string | ITest;
}
