import express from 'express';
const router = express.Router();
import { yupInputValidator } from "../../../middlewares/inputValidator";
import * as userValidator from "../../../validators/user/userValidator";
import User from '../../../database/models/user';
import bcrypt from "bcryptjs";


router.post("/create", yupInputValidator(userValidator.createUser), async (req, res) => {
    const data = req.body;
    let user = await User.findOne({ username: data.name });
    if (user) {
        return res.status(400).json({ message: "Username not available" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const newUser = new User({
        name: data.name,
        password: passwordHash,
    });

    await newUser.save();

    return res.json({ message: "success" });
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/:id", yupInputValidator(userValidator.updateUser), async (req, res) => {
    try {
        const { name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, password: passwordHash }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


export default router;