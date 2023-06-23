import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false },
        sessionToken: {type: String, select: false}
    }
})

export const userModel = mongoose.model("User", userSchema)

/* actions */
export const getUsers = () => userModel.find()
export const getUserByEmail = (email: string) => userModel.findOne({email})
export const getUserBySessionToken = (sessionToken: string) => userModel.findOne({sessionToken})