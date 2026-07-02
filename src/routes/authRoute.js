import { Router } from "express";
import authCont from "../controllers/authCont.js";

const router = Router();

router.post("/admin-login", authCont.adminLogin);
// router.post("/admin-registration", authCont.adminRegistration);
// router.get("/admin-logout", authCont.AdminLogout);

router.post("/seller-login", authCont.sellerLogin);

// router.post("/user-login", authCont.userLogin);
// router.post("/registration", authCont.userRegistration);
// router.get("/user-logout", authCont.userLogout);
router.get("/seller-logout", authCont.sellerLogout);

// 
export default router;
