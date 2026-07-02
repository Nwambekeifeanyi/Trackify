import express from "express";
const router = express.Router();
import adminCont from "../controllers/adminCont.js";


import  upload  from "../helpers/img_processor.js";
import {
  checkAdmin,
  checkAdminLogout,
} from "../middlewares/authMiddleware.js";
import  cloudUpload  from "../helpers/cloudUpload.js";

// router.get("/login", checkAdminLogout, adminCont.getLogin);
// router.get("/register", checkAdminLogout, adminCont.getRegistration);


router.get("/dashboard", adminCont.getDashboard);
router.get("/staffs", adminCont.getStaffs);

// router.get("/users", checkAdmin, adminCont.getUsers);

// router.get("/add_user", checkAdmin, adminCont.getAddUser);
// router.post("/add_user", checkAdmin, adminCont.postAddUser);

// router.get("/update_user", checkAdmin, adminCont.getUpdateUser);
// // router.post("/update_user", adminCont.postUpdateUser);

// router.get("/user_details", checkAdmin, adminCont.getUserDetails);

// router.post("/alter_components", checkAdmin, adminCont.alterComponents);


// router.get("/products", checkAdmin, adminCont.getProducts);
// router.get("/product_details", checkAdmin, adminCont.getProductDetails);
// router.get("/add_product", checkAdmin, adminCont.getAddProduct);
// router.post("/add_product", checkAdmin, cloudUpload, adminCont.postAddProduct);
// router.get("/update_product", checkAdmin, adminCont.getUpdateProduct);

// router.get("/inventory", checkAdmin, adminCont.getInventory);
// router.get("/purchase_records", checkAdmin, adminCont.getPurchase);
// router.get("/sales", checkAdmin, adminCont.getSales);
// router.get("/sales_details", checkAdmin, adminCont.getSalesDetails);
// router.get("/reports", checkAdmin, adminCont.getReport);






// router.get("/add_user",checkAdmin, adminCont.getAddUser);
// router.post("/add_user",checkAdmin, adminCont.postAddUser);

// router.get("/update_user",checkAdmin, adminCont.getUpdateUser);
// router.post("/update_user",checkAdmin, adminCont.postUpdateUser);

// router.get("/view_user",checkAdmin, adminCont.getViewUser);
// router.post("/activate_deactivate",checkAdmin, adminCont.activate_deactivate);
// router.post("/delete_user",checkAdmin, adminCont.delete_user);


export default router;
// export const adminRoute = router;
