import express, { Request } from 'express';
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


export default router;