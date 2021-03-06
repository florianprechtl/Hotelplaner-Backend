import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";

import addressRoutes from "./routes/api/address";
import companyRoutes from "./routes/api/company";
import roomRoutes from "./routes/api/room";
import guestRoutes from "./routes/api/guest";
import cleanerRoutes from "./routes/api/cleaner";
import cleaningTaskRoutes from "./routes/api/cleaningTask";
import bookingRoutes from "./routes/api/booking";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("API Running");
  next();
});

app.use("/api/address", addressRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/guest", guestRoutes);
app.use("/api/cleaner", cleanerRoutes);
app.use("/api/cleaningTask", cleaningTaskRoutes);
app.use("/api/booking", bookingRoutes);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
