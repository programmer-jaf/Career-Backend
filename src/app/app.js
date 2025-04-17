import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "../config/config.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import globalErrorHandler from "../global/globalErrorHandler.js";
import userRouter from "../router/user.routes.js";
// create express server
const app = express();

// cors configuration
app.use(
  cors({
    credentials: true,
    origin: config.frontend_domain,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// rate limit configuration
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

// helmet configuration
app.use(helmet());

// cookie parser configuration
app.use(cookieParser());

// express json configuration
app.use(
  express.json({
    limit: "50mb",
    extended: true,
  })
);

// express urlencoded configuration
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// User.Route
app.use("/api/v1/user", userRouter);
// Company.Route

// Blog.Route

// Contact.Route

// Job.Route

// Application.Route

// globalErrorHandler
app.use(globalErrorHandler);

// export app
export default app;
