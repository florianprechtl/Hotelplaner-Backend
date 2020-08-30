import { Document, Model, model, Schema } from "mongoose";

/**
 * Interface to model the Room Schema for TypeScript.
 * @param roomNumber:string
 * @param building:string
 * @param type:string
 * @param description:string
 * @param isHandycapAccessable:boolean
 * @param level:number
 * @param isChildFriedly:boolean
 * @param dateLastCleaningTask:date
 * @param notes:string
 */
export interface IRoom extends Document {
  roomNumber: string;
  building: string;
  type: string;
  description: string;
  isHandycapAccessable: boolean;
  level: number;
  isChildFriedly: boolean;
  dateLastCleaningTask: Date;
  notes: string;
}

const roomSchema: Schema = new Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    building: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isHandycapAccessable: {
      type: Boolean,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    isChildFriedly: {
      type: Boolean,
      required: true,
    },
    dateLastCleaningTask: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  // The timestamp is used for dev reasons
  {
    timestamps: true,
  }
);

const Room: Model<IRoom> = model("Room", roomSchema);

export default Room;
