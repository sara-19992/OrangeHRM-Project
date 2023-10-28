
import loginPage from "../../../support/pageObject/orange_hrm/loginPage"
import vacancyPage from "../../../support/pageObject/orange_hrm/vacancyPage"
import recruitmentPage from "../../../support/pageObject/orange_hrm/recruitmentPage"

const login: loginPage = new loginPage()
const recruitment: recruitmentPage = new recruitmentPage()
const vacancy: vacancyPage = new vacancyPage()
let id: any
describe('Upload Vacancy File', () => {


    beforeEach(() => {
        cy.visit('/')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })
        recruitment.goTorRcruitment()

        //Add new vacancy 
        cy.fixture('vacancy.json').then((vacancyInfo: any) => {
            vacancy.addVacancyAPI(vacancyInfo.description, vacancyInfo.employeeId, vacancyInfo.isPublished, vacancyInfo.jobTitleId, vacancyInfo.name, vacancyInfo.numOfPositions, vacancyInfo.status).then((resolve) => {
                id = resolve
            })
        })
    })

    it('Edit vacancy and upload attachment file', () => {
        vacancy.visitVacancy(id)
        const path = 'cypress/fixtures/candidateResume.pdf'
        vacancy.uploadVacancyAttachment(path)
    })

    afterEach(() => {
        vacancy.deleteVacancyAPI(id)
    })

})



