const express = require("express");
const app = express();
const path = require("path");
const pa11y = require("pa11y");
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));

app.get("/api/test", async (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
  console.log("this is a test");

  if (!req.query.url) {
    res.status(400).json({ error: "url is required" });
  } else {
    const results = await pa11y(req.query.url);
    res.status(200).json(results);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
