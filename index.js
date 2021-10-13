const express = require("express");
const posts = require("./api/posts");

const app = express();
const PORT = process.env.PORT || 5050;

app.use("/api/posts", posts);

app.use((_, res) => {
  res.status(404).json({
    message: "not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
