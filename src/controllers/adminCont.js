import User from "../models/user.js";
import Admin from "../models/admin.js";

import cloudinary from '../helpers/cloudinary.js';


import { regDate, time } from "../middlewares/date.js";

const adminCont = {
  getLogin: async (req, res) => {
    console.log(regDate);

    return res.render("./adminViews/login");
  },
  getRegistration: async (req, res) => {
    return res.render("./adminViews/register");
  },
  getDashboard: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
    // if (!admin) {
    //   res.redirect('/auth/admin-logout')
    // }

   
    const context = {
      
    };

    return res.render("./adminViews/dashboard", { context });
  },
  getStaffs: async (req, res) => {
    const admin_id = req.admin;
    const admin = await Admin.findOne({ _id: admin_id });

    
    // if (!admin) {
    //   res.redirect('/auth/admin-logout')
    // }

   
    const context = {
      
    };

    return res.render("./adminViews/staffs", { context });
  },
 
 

 

};

export default adminCont;
