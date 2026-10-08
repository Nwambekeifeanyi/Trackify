import { Router } from "express";
import { checkUser, checkUserLogout } from "../middlewares/authMiddleware.js";
import userCont from "../controllers/userCont.js";
import upload from "../helpers/img_processor.js";

const router = Router();

router.get("/dashboard", checkUser, userCont.getDashboard);
router.get("/income-logs",checkUser, userCont.getIncomeLogs);
router.get("/expense-logs",checkUser, userCont.getExpenseLogs);
router.get("/campus-ledger",checkUser, userCont.getCampusLedger);
router.get("/add-income",checkUser, userCont.getAddIncome);
router.get("/add-expenses",checkUser, userCont.addExpenses);
router.get("/add-campus-ledger",checkUser, userCont.addCampusLedger);
router.get("/receipt",checkUser, userCont.getReceipt);

router.post("/add-income",checkUser, userCont.postAddIncome);
router.post("/add-expenses",checkUser, userCont.postAddExpenses);
router.post("/add-campus-ledger",checkUser, userCont.postAddCampusLedger);
export default router;
