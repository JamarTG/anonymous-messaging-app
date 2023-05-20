import express from 'express';
import User from '../schemas/userSchema.js'
const userRouter = express.Router();

userRouter.get("/:username", async function(request, response) {
    const {
        username
    } = request.params;

    try {
        console.log("1")
        const user = await User.findOne({
            username: username.toLowerCase()
        })

        if (!user) {
            console.log("2")
            response.status(404).send(false);
        } else {
            console.log("3" , user._id)
            response.status(200).send(user._id);
        }
    } catch {
        console.log("4")
        response.status(500).send(false);
    }
});

export default userRouter;