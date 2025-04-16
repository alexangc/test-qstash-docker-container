import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", routes);

// Catch all POST routes
app.post("*splat", (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST') {
    console.log(`POST request received at: ${req.originalUrl}`);
    console.log('Request body:', req.body);
  }
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the TypeScript Node.js API" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
