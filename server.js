const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const cors = require('cors')
const YAML = require("yamljs");

let app = express();

app.use(cors())

const DATABASE_URL = "mongodb://localhost/Movieapp";
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("MongoDB Database connection established");
});

app.use(express.json());

const searchRouter = require("./routes/searchRoutes");
const movieRouter = require("./routes/movieRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");
const queryRouter = require("./routes/queriesRoutes");
const userRouter = require("./routes/userRoutes");
const loginRouter = require("./routes/loginRoutes");


app.use('/query',queryRouter);
app.use("/search", searchRouter);
app.use("/movie", movieRouter);
app.use("/feedback", feedbackRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);


const swaggerDocument = YAML.load("swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
