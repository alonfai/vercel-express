const express = require("express");
const axios = require("axios");

const router = express.Router();

async function getItems(start, limit = 10) {
  return axios.get(
    `https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`
  );
}

router.get("/", async (req, res) => {
  try {
    const { start, limit } = req.query;
    if (!start) {
      return res.status(400).json({
        message: "Missing start parameter in the query",
      });
    }
    const { data } = await getItems(start, limit);
    const items = data.map((item) => {
      const { albumId, ...rest } = item;
      return rest;
    });
    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
