import { IRoom } from "src/models/Room";
import { ICleaner } from "src/models/Cleaner";

export type CleaningTaskObject = {
  date: Date;
  room: IRoom["_id"];
  cleaner: ICleaner["_id"];
  notes: string;
};

export interface CleaningTask {
  date: Date;
  room: IRoom["_id"];
  cleaner: ICleaner["_id"];
  notes: string;
}
