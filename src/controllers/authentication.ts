import express, {Request, Response} from "express"
import { createUser, getUserByEmail } from "../db/users"
import { random, authentication } from "../helpers"

/* login controller */
export const login = async(req: Request, res: Response) => {
try {
    const {email, password} = req.body
    if(!email || !password) {
        return res.sendStatus(400)
    } 
    const user = await getUserByEmail(email).select("+authentication.salt +authentication.password") // IMPORTANT
    if(!user) {
        return res.sendStatus(400)
    }
    const expectedhash = authentication (user.authentication?.salt, password)
    if(user.authentication?.password !== expectedhash) {
        console.log("forbidden triggered")
        return res.sendStatus(403)
    }
    const salt = random()
    user.authentication!.sessionToken = authentication(salt, user._id.toString())
    await user.save()
    res.cookie("DNSFB-AUTH", user.authentication?.sessionToken, {domain: "localhost", path: "/"})
    return res.status(200).json(user).end();

} catch (error) {
    console.log(error)
    return res.sendStatus(400);
}
}


/* signup controller */
export const register = async(req: Request, res: Response) => {
    try {

       
        const {email, password, username } = req.body
        if(!email || !password || !username) {
            return res.sendStatus(400)
        }
        const existingUser = await getUserByEmail(email)
        if(existingUser) {
            return res.sendStatus(400)
        }
        const salt = random()
        const user = await createUser({
            email,
            username, 
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}