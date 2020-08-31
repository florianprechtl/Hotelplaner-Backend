import { Document, Model, model, Schema } from "mongoose";
import { Cleaner } from "src/interfaces/cleaner";

/**
 * Interface to model the Cleaner Schema for TypeScript.
 * @param firstName:string
 * @param lastName:string
 * @param address:ref=> Address._id
 * @param email:string
 * @param phoneNumber:string
 * @param notes:string
 */
export interface ICleaner extends Document, Cleaner {}

const cleanerSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
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

const Cleaner: Model<ICleaner> = model("Cleaner", cleanerSchema);

export default Cleaner;
