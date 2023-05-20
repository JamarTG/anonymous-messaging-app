import express from "express";
import User from '../schemas/userSchema.js'
import dotenv from "dotenv";
import mongodb from "../database/mongodb.js";
import errorController from "../controllers/errorController.js";

mongodb.connectToDatabase();
dotenv.config();

const authRouter = express.Router();

authRouter.post("/login", async function (req, res) {
    const {
        username,
        password
    } = req.body;

    try {

        const user = await User.findOne({
            username: username.toLowerCase()
        });
        if (!user) {
            // if you don't have an user it means the user has not been found with that name
            return res.status(404).send("User not found. Try again.");
        }

        const result = await user.comparePassword(password);
        if (!result){
            return res.status(401).send("Invalid password.Try again");
        }
        res.json(user)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

authRouter.post("/register", async function (req, res) {
    const {
        firstName,
        lastName,
        username,
        email,
        password
    } = req.body;

    const user = new User({
        firstName,
        lastName,
        username,
        password,
        email,
        messages: []
    });

    await user.save().then(function () {
        res.status(201).json(user.toObject());
    }).catch(function (error) {
        res.status(500).json(errorController(error));
    })
});

export default authRouter;