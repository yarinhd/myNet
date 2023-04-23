import { IUserChapterPatch } from "./user.interface";

export interface IChapter extends IUserChapterPatch {
  _id?: string;
  title: string;
  description?: string;
  page: number;
}
