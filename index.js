const express = require("express");
const app = express();
app.use(express.json());
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {authenticate} = require("./middlewares/authenticate.middleware")

const {BookingModel} = require("./models/booking.model")
const {UserModel} = require("./models/users.model")
const {userRouter}=require("./routes/user.routes")
const {flightRouter} = require("./routes/Flight.route")
const {BookingRouter} = require("./routes/Booking.route")


const { connection } = require("./configs/db");
app.use("/users",userRouter)

app.use("/flights",flightRouter)
app.get("/", async (req, res) => {
res.send("HOMEPAGE")
});

app.get("/users", async (req, res) => {
  try {
    let data = await UserModel.find();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  const {name,email,password} = req.body;
  try {
    bcrypt.hash(password, 5,async (err, secured_password)=> {
      // Store hash in your password DB.
      if(err){
        console.log(err);
      }else{
        const user = new UserModel({email,password:secured_password,name});
        await user.save();
        res.status(201).send("Registered");
      }
  });
  } catch (error) {
    res.send("error in registering the user");
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);    
    const hashed_pass=user[0].password
    if (user.length > 0) {
      bcrypt.compare(password, hashed_pass , (err, result)=> {
        if(result){
        const token = jwt.sign({ userID:user[0]._id}, "masai");
        res.send({ "msg": "Login Successful", "token": token});
      }else{
        res.send("wrong credentials1");
      }
      });

    } else {
      res.send("wrong credentials2");
    }
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
});




app.use(authenticate)
app.use("/booking",BookingRouter)




app.get("/dashboard", async (req, res) => {
    try {
      let data = await BookingModel.find();
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  });


app.listen(process.env.port, async () => {
  try {
    await connection;
    // console.log(connection);
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
    // res.send("something went wrong")
  }
  console.log(`server running at ${process.env.port} `);
});
