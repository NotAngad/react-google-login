const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const userAuthRoutes = require("./modules/User-Auth/routes");
app.use("/api/v1/user-auth", userAuthRoutes);

app.get("/", (req, res) => {
  res.send({ msg: "Hello World!" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
