export default class recruitmentPage {

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        candiateTable: () => cy.get('.oxd-table-body')
    }

    goTorRcruitment() {
        this.elements.MainMenuItems().contains('Recruitment').click()
    }

    countCandicateRows(count: number) {
        this.elements.candiateTable().find('.oxd-table-card').should('have.length', count)
    }

    getCandicateCountAPI() {
        cy.intercept("GET", '/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC', (req) => {
            req.continue((res) => {
                // console.log(res.body.meta.total)
                const count = res.body.meta.total
                this.countCandicateRows(count)
            })
        })
    }
}