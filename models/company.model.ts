const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: {
      type: Date,
      required: true,
    },
    phonenumber: {
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

export default mongoose.model("Company", companySchema);
