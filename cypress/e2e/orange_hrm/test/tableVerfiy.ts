import loginPage from "../../../support/pageObject/orange_hrm/loginPage"
import recruitmentPage from "../../../support/pageObject/orange_hrm/recruitmentPage"
import candidatePage from "../../../support/pageObject/orange_hrm/addCandidate"

const login: loginPage = new loginPage()
const recruitment: recruitmentPage = new recruitmentPage()
const candidate: candidatePage = new candidatePage()

describe('Table Verfey Row', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })

        cy.fixture('candidate').as('CanInfo')
        cy.fixture('interview').as('InterviewInfo')
        recruitment.goTorRcruitment()
    })

    it('verfy candidate row', () => {
        //[{vecancy:'fdgd'},{date:'12/10/2017'}]

        // cy.get('.oxd-table-header').find('.oxd-table-header-cell.oxd-padding-cell.oxd-table-th').each(($el, index) => {
        //     const el = $el.text();
        //     console.log(el)
        // })
        const data = [{ vacancy: 'asd' }]
        const th = ['vacancy', 'date', 'hiring']
        cy.get('.oxd-table-card').each(($el, index) => {
            if (index > 0) {
                cy.wrap($el).eq(th.indexOf('vacancy')).should('have.text', data[1]['vacancy'])
            }
            // })
            // cy.get('.oxd-table-card').find('.oxd-table-cell').each(($el, index) => {
            //     if (index > 0) {
            //         cy.wrap($el).should('have.text', infoData[searchEmpTb[index - 1]])
            //     }
            // })
        })
    })
})