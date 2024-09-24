const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// User routes
router.post("/register", (req, res) => {
  res.send("User registered");
});

router.get("/users", (req, res) => {
  res.send("List of users");
});

router.get("/users/:id", (req, res) => {
  res.send(`Details of user with ID ${req.params.id}`);
});

router.patch("/users/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} updated`);
});

router.delete("/users/:id", (req, res) => {
  res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;
