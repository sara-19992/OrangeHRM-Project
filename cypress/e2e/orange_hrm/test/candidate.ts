import loginPage from "../../../support/pageObject/orange_hrm/loginPage"
import recruitmentPage from "../../../support/pageObject/orange_hrm/recruitmentPage"
import candidatePage from "../../../support/pageObject/orange_hrm/addCandidate"
import { resolve } from "cypress/types/bluebird"

const login: loginPage = new loginPage()
const recruitment: recruitmentPage = new recruitmentPage()
const candidate: candidatePage = new candidatePage()

let id: any = 0
describe('Candidates Page Functionality', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })

        cy.fixture('candidate').as('CanInfo')
        cy.fixture('interview').as('InterviewInfo')
        recruitment.goTorRcruitment()
    })

    it('Add new candidate use API', () => {
        cy.get('@CanInfo').then((candicate: any) => {
            candidate.addCandidateAPI(candicate.contactNumber, candicate.email, candicate.firstName, candicate.lastName, candicate.middleName, candicate.vacancyId).then((resolve) => {
                id = resolve
            })
        })
    })

    it('Shortlist a candidate use API', () => {
        candidate.shortListCandidateAPI(id)
    })

    it('schedule interview for a candidate use UI', () => {
        cy.get('@InterviewInfo').then((interview: any) => {
            candidate.scheduleInterviewCandiate(id, interview.Title, interview.Interviewer, interview.Date, interview.Time)
        })
    })


})