import loginPage from "../../../support/pageObject/orange_hrm/loginPage";
const login: loginPage = new loginPage()

describe('Sign in : forget Password', () => {

    beforeEach(() => {
        cy.visit('/web/index.php')
        cy.fixture('adminLogin').as('users')
    })

    it.only('Forget Password', () => {
        cy.get('@users').then((user: any) => {
            login.forget(user[0]);
        })
    })

})