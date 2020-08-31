import { Document, Model, model, Schema } from "mongoose";
import { CleaningTask } from "src/types/cleaningTask";

/**
 * Interface to model the CleaningTask Schema for TypeScript.
 * @param date:date
 * @param room:ref=> Room._id
 * @param cleaner:ref=> Cleaner._id
 * @param notes:string
 */
export interface ICleaningTask extends Document, CleaningTask {}

const cleaningTaskSchema: Schema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    cleaner: {
      type: Schema.Types.ObjectId,
      ref: "Cleaner",
      required: true,
    },
    notes: {
      type: Date,
      required: false,
    },
  },
  // The timestamp is used for dev reasons
  {
    timestamps: true,
  }
);

const CleaningTask: Model<ICleaningTask> = model(
  "CleaningTask",
  cleaningTaskSchema
);

export default CleaningTask;
