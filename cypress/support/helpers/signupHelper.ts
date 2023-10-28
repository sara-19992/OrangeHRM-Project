import { reject, resolve } from "cypress/types/bluebird"
import { initUser } from "../init/initUser"
import userRseponseInt from "../api/response/userAPIResponse"

export const URLs = {
    users: 'https://conduit.productionready.io/api/users'
}

export default class user {
    static signupUserAPI() {
        return new Cypress.Promise<userRseponseInt>((resolve, reject) => {
            cy.signupUser(URLs.users, initUser()).then(() => {
                resolve('Signup Done')
            })
        })
    }
}