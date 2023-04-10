import http from "http";
import cors from "cors";
import connectDB from "./utils/connectDB.js";
import app from "./app.js";

const httpServer = http.createServer(app);

const corsOptions = {
  origin: ["http://localhost:8000"],
  credentials: true,
};

app.use(cors(corsOptions));

await connectDB();

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION ?? Shutting down...");
  console.error("Error?", err.message);

  httpServer.close(async () => {
    process.exit(1);
  });
});
