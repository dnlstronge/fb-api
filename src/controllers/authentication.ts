import express, {Request, Response} from "express"
import { createUser, getUserByEmail } from "../db/users"
import { random, authentication } from "../helpers"

export const register = async(req: Request, res: Response) => {
    try {

        /* registration process */
        const {email, password, username } = req.body
        if(!email || !password || !username) {
            return res.sendStatus(400 )
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
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}