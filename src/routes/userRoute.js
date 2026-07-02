import { Router } from "express";
import { checkUser, checkUserLogout } from "../middlewares/authMiddleware.js";
import userCont from "../controllers/userCont.js";
import upload from "../helpers/img_processor.js";

const router = Router();

router.get("/dashboard", userCont.getDashboard);
router.get("/income-logs", userCont.getIncomeLogs);
router.get("/expense-logs", userCont.getExpenseLogs);
router.get("/campus-ledger", userCont.getCampusLedger);
router.get("/add-income", userCont.getAddIncome);
router.get("/add-expenses", userCont.addExpenses);
router.get("/add-campus-ledger", userCont.addCampusLedger);
router.get("/receipt", userCont.getReceipt);

export default router;
