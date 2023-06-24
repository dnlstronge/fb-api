import express, {Request, Response} from "express"
import {get, merge} from "lodash"
import { getUserBySessionToken } from "../db/users"


export const isAuthenticated = async(req: Request, res: Response) => {
    try {
        const sessionToken = req.cookies("DNSDB-AUTH")
        if(!sessionToken) {
            return res.sendStatus(403)
        }
        const existingUser = await getUserBySessionToken(sessionToken)
        if(!existingUser) {
            return res.sendStatus(403)
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}