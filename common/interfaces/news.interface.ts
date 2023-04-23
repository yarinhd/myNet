import { IArea } from "./area.interface";

export interface INewsQuery {
  area: string;
}

export interface INews {
  _id?: string;
  createdAt: Date;
  description: string;
  area: string | IArea;
}
