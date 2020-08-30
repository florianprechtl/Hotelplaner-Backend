const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema(
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

export default mongoose.model("Room", roomSchema);
