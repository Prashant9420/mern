const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('../db/conn')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send("hello from express router");
});

router.post('/register', async (req, res) => {
    const { username, email, phone, work, password, cpassword } = req.body;
    if (!username || !email || !phone || !work || !password || !cpassword) {
        return res.status(401).json({ mess: 'pls fill all fields' })
    }
    if (cpassword != password) {
        return res.status(400).json({ mess: 'passwords not matching' })
    }
    try {
        const ue = await User.findOne({ email: email })
        if (ue) {
            console.log("Email already exists")
            return res.status(422).json({ mess: "Email already exists" })
            
        }
        const newUser = new User({ username, email, phone, work, password, cpassword });
        await newUser.save()
        res.status(201).json({ mess: "user added" });
    } catch (err) {
        console.log(err);
        res.json({ err: "something went wrong" });
    };

})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const ema = await User.findOne({ email: email })
        if (ema) {
            const pass = await bcrypt.compare(password, ema.password);
            const token = await ema.generateAuthToken();
            if (pass) {
                res.status(200).json({ mess: 'welcome user' });
            }
        } else {
            res.status(400).json({ mess: 'invalid credentials' });
        }
    } catch (err) {
        res.json({ err: 'something went wrong' })
    }

})

router.post('/sendmail', async (req, res) => {
    const {name,email,phone,message,mode}=req.body;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure:false,
      auth: {
        user: 'prashantpal2468@gmail.com',
        pass: 'sopzualsmuirgimo'
      }
    });
    // console.log(mode);
    if(mode==='contact'){
    if(!name||!message||!email||!phone){return res.status(400).json({})}
    if(phone.length!=10){return res.status(401).json({})}
    if(!email.endsWith(".com") || !email.split('@').length==2){return res.status(402).json({})}
    
    let mailOptions = {
      from: email,
      to: 'prashantpal2468@gmail.com',
      subject: 'Email from '+name,
      text: message+"\ncontact me: "+phone
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(400).json({});
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({});
      }
    });}
    else{
      console.log(mode);
      // let transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   port: 465,
      //   secure:false,
      //   auth: {
      //     user: 'prashantpal2468@gmail.com',
      //     pass: 'sopzualsmuirgimo'
      //   }});
      let mailOptions = {
        from: 'prashantpal2468@gmail.com',
        to: email,
        subject: 'Email from Prashant',
        text: message
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).json({});
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({});
        }
      });

    }
  });

module.exports = router;