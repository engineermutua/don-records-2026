//Imports
import express from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import dns from "dns";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import morgan from "morgan";

//Config
//Google default dns to bypass network restrictions
dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
  "[2001:4860:4860::8888]",
  "[2001:4860:4860::8844]",
]);
const app = express();
const port = process.env.PORT;

connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Routes
app.get("/", (req, res) => {
  res.send("The Dons Server is Working.");
});

//users
app.use("/api/user/", userRouter);

//admin
app.use("/api/admin/", adminRouter);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
