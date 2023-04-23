import { IUser } from "./user.interface";

export interface ICommentUserless {
  _id?: string;
  createdAt: Date;
  comment: string;
}

export interface IComment extends ICommentUserless {
  user: string | IUser;
}
