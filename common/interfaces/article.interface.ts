import { Category } from "../enums/Category";
import { IComment } from "./comment.interface";

interface IBestSoldier {
  name: string;
  age: number;
  unit: string;
  city: string;
  description: string;
  image: string;
}

export interface IArticleQuery {
  category?: Category;
}

export interface IArticle {
  _id?: string;
  createdAt: Date;
  title: string;
  writenBy: string;
  pdf: string;
  category: Category;
  comments: string[] | IComment[];
  bestSoldier: IBestSoldier;
  thumbNail: string;
}

export interface IArticleGroup {
  category: Category;
  articles: IArticle[];
}
