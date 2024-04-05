const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(userRoutes);
app.use(bookRoutes);

app.listen(port, () => {
  console.log("Server running on port " + port);
});
