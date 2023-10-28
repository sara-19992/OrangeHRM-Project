import user from "../../../support/helpers/signupHelper"

describe('Conduit: Signup Account', { tags: '@smoke' }, () => {

    it('Sign up : create new account', () => {
        user.signupUserAPI().then((resolve) => {
            cy.log(`${resolve}`)
        })
    })
})