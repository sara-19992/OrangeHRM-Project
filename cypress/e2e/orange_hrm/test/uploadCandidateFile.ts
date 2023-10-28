import loginPage from "../../../support/pageObject/orange_hrm/loginPage"
import recruitmentPage from "../../../support/pageObject/orange_hrm/recruitmentPage"
import candidatePage from "../../../support/pageObject/orange_hrm/addCandidate"


const login: loginPage = new loginPage()
const recruitment: recruitmentPage = new recruitmentPage()
const candidate: candidatePage = new candidatePage()

describe('Add Candidate With Upload File', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })

        cy.fixture('candidate').as('CanInfo')
        cy.fixture('interview').as('InterviewInfo')
        recruitment.goTorRcruitment()
    })

    it('Add candidte with file upload', () => {
        cy.get('@CanInfo').then((candicate: any) => {
            candidate.addCandidateUI(candicate.email, candicate.firstName, candicate.lastName, candicate.resume)
        })
    })
})