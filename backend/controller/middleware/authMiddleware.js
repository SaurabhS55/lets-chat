const userModel = require("../../model/userModel");
const jwt = require("jsonwebtoken");

const validateUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const payload = jwt.verify(token, process.env.jwt_secret);
        const currentUser = await userModel.findById(payload.id);
        if (!currentUser) {
            const err = new Error("User not found");
            err.status = 400;
            throw err;
        }
        else {
        // req.currentUser = currentUser;
        res.status(200).json({message:"Valid User"})
        }
    } catch (err) {
        res.status(400).json({ message: "User not found" });
    }
}
module.exports = { validateUser };