const mongoose = require("mongoose");
require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
app.use(express.json())
const router=require("./routes/userRoutes");
const router1=require("./routes/jobRoutes");

app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error(`Error while connecting to MongoDB Atlas: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB Atlas");
});

app.use(express.urlencoded({extended:false}))



app.use(router);
app.use(router1);

app.listen(port, ()=>{ console.log(`App listening on port ${port}`)

})