import userPayloadInt from "../api/payloaad/userAPIPayload";
import { genericUsername, genericEmail, genericString } from "../helpers/genericFuncs"


export const initUser = () => {
    let userPayload: userPayloadInt = {
        user: {
            email: genericEmail('sarah'),
            username: genericUsername('sarah'),
            password: genericString()
        }
    }
    return userPayload
}