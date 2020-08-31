import { Document, Model, model, Schema } from "mongoose";
import { Address } from "src/objectDefinitions/address";

/**
 * Interface to model the Address Schema for TypeScript.
 * @param street:string
 * @param postCode:string
 * @param city:string
 * @param country:string
 * @param notes:string
 */
export interface IAddress extends Document, Address {}

const addressSchema: Schema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
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

const Address: Model<IAddress> = model("Address", addressSchema);

export default Address;
