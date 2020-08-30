import { Document, Model, model, Schema } from "mongoose";
import { IAddress } from "./Address";

/**
 * Interface to model the Guest Schema for TypeScript.
 * @param firstName:string
 * @param lastName:string
 * @param address:ref=> Address._id
 * @param email:string
 * @param phoneNumber:string
 * @param notes:string
 */
export interface IGuest extends Document {
  firstName: string;
  lastName: string;
  address: IAddress["_id"];
  email: string;
  phoneNumber: string;
  notes: string;
}

const guestSchema: Schema = new Schema(
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
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
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

const Guest: Model<IGuest> = model("Guest", guestSchema);

export default Guest;
