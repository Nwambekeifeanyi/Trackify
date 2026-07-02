import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import Product from "../models/product.js";
import Cart from "../models/cart.js";
import Report from "../models/report.js";
import { regDate, time, today } from "../middlewares/date.js";
import Logger from "nodemon/lib/utils/log.js";

const userCont = {
  getDashboard: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    // if (!this_user) res.redirect("/auth/user-logout");

    
    const context = {
      
    };
    return res.render("./userViews/dashboard", { context });
  },
  getIncomeLogs: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/income_logs", { context });
  },
  getExpenseLogs: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/expense_logs", { context });
  },
  getExpenseLogs: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/expense_logs", { context });
  },
  getCampusLedger: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/campus_ledger", { context });
  },


  getAddIncome: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/add_income", { context });
  },
 
  addExpenses: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/add_expenses", { context });
  },
  addCampusLedger: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/add_campus_ledger", { context });
  },
 
  getReceipt: async (req, res) => {
    const this_user_id = req.user;
    // const this_user = await User.findOne({ _id: this_user_id });

    const context = {
      
    };
    return res.render("./userViews/receipt", { context });
  },
 

};

export default userCont;
