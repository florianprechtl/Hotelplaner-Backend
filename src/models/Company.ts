import { Document, Model, model, Schema } from "mongoose";
import { Company } from "src/objectDefinitions/company";

/**
 * Interface to model the Company Schema for TypeScript.
 * @param name:string
 * @param phoneNumber:string
 * @param address:ref=> Address._id
 * @param notes:string
 */
export interface ICompany extends Document, Company {}

const companySchema: Schema = new Schema(
  {
    name: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: false,
    },
    email: {
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

const Company: Model<ICompany> = model("Company", companySchema);

export default Company;
