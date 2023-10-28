import loginPage from "../../../support/pageObject/orange_hrm/loginPage"
import recruitmentPage from "../../../support/pageObject/orange_hrm/recruitmentPage"

const login: loginPage = new loginPage()
const recruitment: recruitmentPage = new recruitmentPage()


describe('Recruitment Functinality', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })

        recruitment.goTorRcruitment()
    })

    it('count candicate rows', () => {
        recruitment.getCandicateCountAPI()
    })
})