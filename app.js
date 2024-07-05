require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const profilesRouters=require("./routes/profile")

const app = express();

const port = process.env.PORT || 3000;

mongoose
  .connect(
    `Add Atlas url here
    `,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


  app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(express.json())

app.use('/images', express.static(path.join('images')))

app.use('/api/profiles',profilesRouters)



//-----------------------------------
//  http://localhost:3000/api/profiles 
//   name
//   image
