import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import formRouter from "./routes/form";

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI;
(async function () {
  try {
    await mongoose
      .connect(MONGODB_URI!)
      .then(() => console.log("MongoDB connection successful"));
  } catch (e: any) {
    console.error(e.message);
  }
})();

const app = express();
app.use(express.json());
app.use(cors());

const apiRouter = express.Router();
apiRouter.use("/form", formRouter);

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello, there!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on PORT`, PORT));
