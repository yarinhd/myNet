import { ContentType } from "../enums/ContentType";
import { IInfographic } from "./infographic.interface";
import { IItem } from "./item.interface";
import { ILesson } from "./lesson.interface";
import { IMedia } from "./media.interface";
import { IPakal } from "./pakal.interface";

export interface IContentQuery {
  item: string;
  contentId: string;
  contentType: ContentType;
}

export interface IContentCreator<T> {
  content: T;
  item?: IItem;
  contentId?: string;
}

export type IAllContent = ILesson | IPakal | IMedia | IInfographic;
