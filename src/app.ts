import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import client from "./db";
import propertyRouter from "./routes/property";
import usersRouter from "./routes/users";
import { userQuery } from "./schema/tables";

const app = express();
client
  .connect()
  .then(async () => {
    console.log("DB Connected");
    await client.query(userQuery);
  })
  .catch(() => console.log("DB not connected"));

// view engine setup
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/property", propertyRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
