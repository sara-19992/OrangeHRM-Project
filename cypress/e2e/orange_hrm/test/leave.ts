import loginPage from "../../../support/pageObject/orange_hrm/loginPage"

const login: loginPage = new loginPage();

describe('Leave Actions', () => {

    beforeEach(() => {
        cy.visit('/web/index.php')
        cy.fixture('adminLogin').as('users')
        cy.get('@users').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })

    })

    it('Search Leave with status', () => {

    })

})