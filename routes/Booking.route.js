const express = require("express")
const {BookingModel} = require("../models/booking.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const BookingRouter= express.Router()



// BookingRouter.get("/dashboard", async (req, res) => {
//     try {
//       let data = await BookingModel.find();
//       res.status(201).send(data);
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   req.body.userID=userID
  BookingRouter.post("/:id", async (req, res) => {
    const bookingId = req.params.id;
    // req.body.bookingId=bookingId
    let obj={user:req.body.userID,flight:bookingId}
    
    // res.send(obj)
    // const {name,email,password} = req.body;
    
    try {
        
          const booking = new BookingModel(obj);
          await booking.save();
          res.status(201).send("booked");
    } catch (error) {
      res.send("error in booking the flight");
      console.log(error);
    }
})

  
//   BookingRouter.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await BookingModel.find({ email });
//       console.log(user);    
//       const hashed_pass=user[0].password
//       if (user.length > 0) {
//         bcrypt.compare(password, hashed_pass , (err, result)=> {
//           if(result){
//           const token = jwt.sign({ userID:user[0]._id}, "masai");
//           res.send({ "msg": "Login Successful", "token": token});
//         }else{
//           res.send("wrong credentials1");
//         }
//         });
  
//       } else {
//         res.send("wrong credentials2");
//       }
//     } catch (error) {
//       res.send("something went wrong");
//       console.log(error);
//     }
//   });
  
  
  
  module.exports={BookingRouter}