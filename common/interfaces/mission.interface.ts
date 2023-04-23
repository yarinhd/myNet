import { ContentType } from "../enums/ContentType";
import { WatchMode } from "../enums/WatchMode";
import { IItem } from "./item.interface";
import { IUser } from "./user.interface";

export interface IMissionQuery {
  editor?: string;
  startDate: Date;
  endDate: Date;
}

export interface IMissionCreator {
  title: string;
  contentType: ContentType;
  priority?: number;
  notes?: string;
  startDate: Date;
  complitionDate: Date;
  editor: string;
}

export interface IMission {
  _id?: string;
  notes?: string;
  startDate: Date;
  complitionDate: Date;
  status?: WatchMode;
  director: string | IUser;
  editor: string | IUser;
  item: string | IItem;
}

export interface IMissionGroup {
  data: { user: IUser; missions: IMission[] }[];
  metadata: { totalMissions: number; totalCompletedMissions: number };
}
