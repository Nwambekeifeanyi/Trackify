import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import { regDate, time } from "../middlewares/date.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import Seller from "../models/seller.js";



export default {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let passwordRegex =
        /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;

      if (!emailRegex.test(email)) {
        throw Error("invalid username");
      }
      if (!passwordRegex.test(password)) {
        throw Error("invalid password and it must be greater than 4");
      }

      const admin = await Admin.login(email, password);
      console.log(admin);
      const token = jwt.sign({ id: admin._id }, process.env.TOKEN_SECRET);
      console.log(token);
      res.cookie("jwt", token, { maxAge: 5000 * 60 * 60 });
      return res.status(200).json({ success: "login successful" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  adminRegistration: async (req, res) => {
    try {
      const { 
        first_name,
        last_name,
        email,
        contact,
        password,
       } = req.body;
      console.log(req.body);

      // ===================== check already registered ==========================
      const isRegistered = await Admin.findOne({ email: email });

      if (isRegistered) {
        throw Error('this user is already resgistered')
      }

      

      const registeredAdmin = await Admin.create({
       first_name,
       last_name,
        email,
        contact,
        password,
        regDate,
      });

      console.log(registeredAdmin);
      

      return res.status(200).json({
        success: "registration successfull",
      });
    }  catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

   sellerLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.body);
        const existingSeller = await Seller.findOne({ email: email });

        // 1. Precise but secure account check
        if (!existingSeller) {
            return res.status(404).json({ 
                success: false, 
                error: "No seller account found with this email." 
            });
        }

        if (existingSeller.is_blocked) {
            return res.status(403).json({ 
                success: false, 
                error: "Access restricted. Please contact support@ump.com" 
            });
        }

       
      
      console.log(req.body);

      

      const seller = await Seller.login(email, password);
      const token = jwt.sign({ id: seller._id }, process.env.TOKEN_SECRET);
      res.cookie("jwt", token, { maxAge: 5000 * 60 * 60 });

      if (seller) {
        let last_login = {
          regDate, time
        };
        const update_login_time = await Seller.findOneAndUpdate({_id: seller._id}, {last_login});
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  userRegistration: async (req, res) => {
    try {
      const { 
        first_name,
        last_name,
        email,
        contact,
        password,
       } = req.body;
      console.log(req.body);

 regDate = `${regDate}|${time}`
console.log(regDate);

      // ===================== check already registered ==========================
      const isRegistered = await User.findOne({ email: email });
      if (isRegistered) {
        throw new Error('this user is already resgistered')
      }

                 
// throw new Error()
 regDate = `${regDate}:${time}`
      const registeredUser = await User.create({
       first_name,
       last_name,
        email,
        contact,
        password,
        status: 'client',
        regDate,
      });

     
      
      return res.status(200).json({
        success: "registration successfull",
      });
    }  catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.body);
      
      const thisUser = await User.findOne({ email: email });
      console.log(thisUser);

       if (!thisUser) throw new Error("This account does not exist")

      if (thisUser.is_blocked) throw new Error('Sorry, access denied!')
      if (thisUser.role == 'customer') throw new Error('Sorry, access denied!')

      
      console.log(req.body);
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let passwordRegex =
        /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{5,}$/;

      

      const user = await User.login(email, password);
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
      res.cookie("jwt", token, { maxAge: 5000 * 60 * 60 });

      // if (user) {
      //   let last_login = `${regDate}|${time}`;
      //   const update_login_time = await User.findOneAndUpdate({_id: thisUser._id}, {last_login});
      // }
      return res.status(200).json({ success: "login successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  AdminLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/admin/login");
  },
  sellerLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/seller/login");
  },
  userLogout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/");
  },

};
