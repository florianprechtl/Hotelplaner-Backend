const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema(
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

export default mongoose.model("Address", addressSchema);
