const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/registerUser", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/userInformation", userController.getUserInformation);
router.patch("/updateInformation", userController.updateUserInformation);
router.delete("/deleteAccount", userController.deleteUser);
router.delete("/logout", userController.logoutUser);

module.exports = router;
