const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(require("cors")());

mongoose.connect(
  "mongodb://127.0.0.1/ipl",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => {
    console.log("Database connected");
  }
);

app.use("/teams", require("./routes/teams"));
app.use("/matches", require("./routes/matches"));

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
});
