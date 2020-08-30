import { Document, Model, model, Schema } from "mongoose";
import { IGuest } from "./Guest";
import { ICompany } from "./Company";

/**
 * Interface to model the Booking Schema for TypeScript.
 * @param checkinDate:date
 * @param checkouDate:date
 * @param guest:ref => Guest._id
 * @param company:ref => Company._id
 * @param hasBreakfast:boolean
 * @param paymentMethod:string
 * @param isPayed:boolean
 * @param notes:string
 */
export interface IBooking extends Document {
  checkinDate: Date;
  checkoutDate: Date;
  guest: IGuest["_id"];
  company: ICompany["_id"];
  hasBreakfast: boolean;
  paymentMethod: string;
  isPayed: boolean;
  notes: string;
}

const bookingSchema: Schema = new Schema(
  {
    checkinDate: {
      type: Date,
      required: true,
    },
    checkoutDate: {
      type: Date,
      required: true,
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: false,
    },
    hasBreakfast: {
      type: Boolean,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isPayed: {
      type: Boolean,
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

const Booking: Model<IBooking> = model("Booking", bookingSchema);

export default Booking;
