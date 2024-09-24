const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const navbarRoutes = require("./routes/Navbar");
const signupRoutes = require("./routes/signup");
const LoginRoutes = require("./routes/Login");
app.use(navbarRoutes);

app.use(signupRoutes);

app.use(LoginRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
