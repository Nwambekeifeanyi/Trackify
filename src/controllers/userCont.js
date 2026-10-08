import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import Admin from "../models/admin.js";
import { regDate, time, today } from "../middlewares/date.js";
import Transaction from "../models/transaction.js";

const userCont = {
  getDashboard: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");


    const recents = await Transaction.find().sort({_id:-1}).limit(4)



    // Remove the startOfMonth/endOfMonth date boundary calculations entirely

// Define your baseline budget limits directly in code
const hardcodedThresholdLimits = {
    academic: 50000,
    subsistence: 30000,
    infrastructure: 40000,
    'housing & rent': 80000,
    utilities: 25000,
    logistics: 20000,
    healthcare: 15000,
    marketing: 35000,
    'legal & taxes': 30000,
    other: 15000
};

// Aggregate real expenditures across all time from your existing transactions collection
const monthlyExpenditureGaps = await Transaction.aggregate([
    {
        $match: {
            user: new mongoose.Types.ObjectId(this_user_id),
            type: { $in: ['expense', 'campus'] } // Capture all debits regardless of date
        }
    },
    {
        $group: {
            _id: "$category", // Group dynamically by category string
            totalSpent: { $sum: "$amount" }
        }
    }
]);

// Map aggregated results back into the design schema payload format
const trackingCategories = [
    'academic', 
    'subsistence', 
    'infrastructure', 
    'housing & rent', 
    'utilities', 
    'logistics', 
    'healthcare', 
    'marketing', 
    'legal & taxes', 
    'other'
];

const budgets = trackingCategories.map(cat => {
    // Keep the case-insensitive conversion to make sure matches are caught perfectly
    const aggregatedRecord = monthlyExpenditureGaps.find(r => r._id?.toLowerCase() === cat.toLowerCase());
    return {
        category: cat,
        spent: aggregatedRecord ? aggregatedRecord.totalSpent : 0,
        limit: hardcodedThresholdLimits[cat]
    };
});
       


    const context = {
      this_user,
      recents,
      budgets
    };
    return res.render("./userViews/dashboard", { context });
  },


  getIncomeLogs: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");
    const incomes =  await Transaction.find({type: 'income', user: this_user_id}).sort({date:-1, _id: -1})
    const context = {
      this_user,
      incomes,
    };
    return res.render("./userViews/income_logs", { context });
  },



  getExpenseLogs: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");

    const expenses = await Transaction.find({type: 'expense', user: this_user_id}).sort({date:-1, _id: -1})
    const context = {
      this_user,
      expenses
    };
    return res.render("./userViews/expense_logs", { context });
  },



  getCampusLedger: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");

    const ledgers = await Transaction.find({type: 'campus', user: this_user_id}).sort({date:-1, _id: -1})

    console.log(ledgers);
    
    const context = {
      this_user,
      ledgers,
    };
    return res.render("./userViews/campus_ledger", { context });
  },


  getAddIncome: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");
    const context = {
      this_user,
    };


    return res.render("./userViews/add_income", { context });
  },

  addExpenses: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");
    const context = {
      this_user,
    };


    return res.render("./userViews/add_expenses", { context });
  },
  addCampusLedger: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");
    const context = {
      this_user,
    };


    return res.render("./userViews/add_campus_ledger", { context });
  },

  getReceipt: async (req, res) => {
    const this_user_id = req.user;
    const this_user = await User.findOne({ _id: this_user_id });

    if (!this_user) res.redirect("/auth/user-logout");

    const {id} = req.query;

    const transaction = await Transaction.findOne({_id: id})
    const context = {
      this_user,
      transaction,
    };

    return res.render("./userViews/receipt", { context });
  },

  postAddIncome: async (req, res) => {
    try {
        const { 
            source,
            amount,
            category,
            description,
            date,
        } = req.body;
        
        console.log("Income Transaction Log Received:", req.body);

       

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ 
                error: "Invalid ledger metric. Gross transaction amount must be greater than zero." 
            });
        }

        // 2. ISOLATE ACTIVE USER ROOT REFERENCE
        // Ensure your auth middleware is populating the standard user context object safely
        const this_user_id = req.user
        if (!this_user_id) {
            return res.status(401).json({ 
                error: "Access signature is invalid." 
            });
        }

        // 3. PERSISTENT TRANSACTION OBJECT STORAGE DESIGNATION
        // Assuming your transactional ledger collection model is explicitly called Income
        const newIncomeRecord = await Transaction.create({
            user: this_user_id,
            source: source,
            amount: parsedAmount,
            type: 'income',
            category,
            regDate:date,
            description: description
        });

        // 4. ATOMIC METRIC AGGREGATION PIPELINE
        // Automatically increments 'income' and 'balance' metrics on the target User record document block
        await User.findByIdAndUpdate(this_user_id, {
            $inc: { 
                income: parsedAmount, 
                balance: parsedAmount 
            }
        });

        console.log("Financial Transaction Committed:", newIncomeRecord._id);

        // 5. SUCCESS RESPONSIVE LIFECYCLE
        return res.status(201).json({
            success: true,
            message: "Financial transaction successfully committed to ledger records."
        });

    } catch (error) {
        console.error("Critical Exception Caught on Add Income Gateway:", error);
        return res.status(500).json({ 
            error: "Internal server pipeline error encountered during node transaction deployment." 
        });
    }
},


postAddExpenses: async (req, res) => {
    try {
        const { 
            source,
            amount,
            category,
            description,
            date,
        } = req.body;
        
        console.log("Expense Transaction Log Received:", req.body);

      

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ 
                error: "Invalid ledger metric. Gross transaction amount must be greater than zero." 
            });
        }

        // 2. ISOLATE ACTIVE USER ROOT REFERENCE
        // Ensure your auth middleware passes the explicit ID string or ObjectId reference
        const userId = req.user?._id || req.user?.id || req.user;
        if (!userId) {
            return res.status(401).json({ 
                error: "Access signature is invalid or has expired." 
            });
        }

        // 3. PERSISTENT TRANSACTION OBJECT STORAGE DESIGNATION
        const newExpenseRecord = await Transaction.create({
            user: userId,
            source: source,
            amount: parsedAmount,
            type: 'expense', // ✅ CHANGED: Classified explicitly as a debit entry
            category,
            regDate: date,
            description: description
        });

        // 4. ATOMIC METRIC AGGREGATION PIPELINE
        // Increments expenditure balances while safely decrementing the overall float balance
        await User.findByIdAndUpdate(userId, {
            $inc: { 
                expenditure: parsedAmount,  // ✅ CHANGED: Increment total spent pool
                balance: -parsedAmount      // ✅ CHANGED: Deduct balance pool atomically
            }
        });

        console.log("Expense Transaction Committed:", newExpenseRecord._id);

        // 5. SUCCESS RESPONSIVE LIFECYCLE
        return res.status(201).json({
            success: true,
            message: "Expense transaction successfully committed to ledger records."
        });

    } catch (error) {
        console.error("Critical Exception Caught on Add Expense Gateway:", error);
        return res.status(500).json({ 
            error: "Internal server pipeline error encountered during node transaction deployment." 
        });
    }
},
postAddCampusLedger: async (req, res) => {
    try {
        const { 
            source,      // Map to fee description text
            amount,
            session,      // Map to academic calendar year block
            status,       // 'PENDING' or 'CLEARED'
            description,  // Descriptive reference notes
            date,
        } = req.body;
        
       

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ 
                error: "Invalid billing metric. Gross invoice sum must be greater than zero." 
            });
        }

        // 2. ISOLATE ACTIVE USER ROOT REFERENCE
        const userId = req.user?._id || req.user?.id || req.user;
        if (!userId) {
            return res.status(401).json({ 
                error: "Access signature is invalid or has expired." 
            });
        }

        // 3. PERSISTENT CAMPUS TRANSACTION OBJECT STORAGE DESIGNATION
        // Adjust the collection model name if you maintain an explicit model for campus fees (e.g., CampusLedger)
        const newCampusRecord = await Transaction.create({
            user: userId,
            source,
            amount: parsedAmount,
            type: 'campus', // Classify context as a campus educational entry
            session,
            status,
            regDate: new Date(date),
            description: description ? description.trim() : ""
        });

        // 4. CONDITIONAL ATOMIC METRIC AGGREGATION PIPELINE
        // Only deduct user wallet balance immediately if the transaction status is already CLEARED (settled)
        if (status === 'CLEARED') {
            await User.findByIdAndUpdate(userId, {
                $inc: { 
                    expenditure: parsedAmount,  // Increment total spent pool
                    balance: -parsedAmount      // Deduct balance pool atomically
                }
            });
        }

        console.log("Campus Ledger Invoice Committed:", newCampusRecord._id);

        // 5. SUCCESS RESPONSIVE LIFECYCLE
        return res.status(201).json({
            success: true,
            message: "Campus billing record successfully appended to ledger."
        });

    } catch (error) {
        console.error("Critical Exception Caught on Campus Ledger Gateway:", error);
        return res.status(500).json({ 
            error: "Internal server pipeline error encountered during campus ledger node deployment." 
        });
    }
},
};

export default userCont;
