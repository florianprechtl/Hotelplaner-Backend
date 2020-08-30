const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    phonenumber: {
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

export default mongoose.model("Guest", guestSchema);
