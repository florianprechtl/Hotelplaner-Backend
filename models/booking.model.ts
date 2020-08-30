const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
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

export default mongoose.model("Booking", bookingSchema);
