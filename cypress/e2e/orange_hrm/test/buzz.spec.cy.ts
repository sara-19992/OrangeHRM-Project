import loginPage from "../../../support/pageObject/orange_hrm/loginPage"
import buzzPage from "../../../support/pageObject/orange_hrm/buzzPage"

const login: loginPage = new loginPage()
const buzz: buzzPage = new buzzPage()


describe('Write buzz data', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })
        buzz.goToBuzzPage()
        cy.writeFile('cypress/fixtures/buzz.txt', 'Sarah New New Post')
    })

    it('Add New Post', () => {
        cy.readFile('cypress/fixtures/buzz.txt').then(function (value) {
            cy.log(value)
            buzz.newPost(value)
        })
    })
})