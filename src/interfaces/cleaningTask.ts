import { IRoom } from "src/models/Room";
import { ICleaner } from "src/models/Cleaner";

export interface CleaningTask {
  date: Date;
  room: IRoom["_id"];
  cleaner: ICleaner["_id"];
  notes: string;
}
