const { Router } = require("express");

const {
registerUser,
loginUser,
logoutUser,
getmeController
} = require("../controllers/authController");

const {authUser} = require("../middlewares/authmiddleware")
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/getme" , authUser, getmeController);

module.exports = router;
