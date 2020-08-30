const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cleaningTaskSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    cleaner: {
      type: Schema.Types.ObjectId,
      ref: "Cleaner",
      required: true,
    },
    notes: {
      type: Date,
      required: false,
    },
  },
  // The timestamp is used for dev reasons
  {
    timestamps: true,
  }
);

export default mongoose.model("CleaningTask", cleaningTaskSchema);
