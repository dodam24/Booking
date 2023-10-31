import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}], // [{ number: 101, unavailableDates:[12.23.2023, 12.25.2023] }]
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
