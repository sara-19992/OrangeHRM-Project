import keyValue from "../../interface/keyValue"

const searchEmpTb = ['EmployeeId', 'FirstMiddleName', 'LastName', 'JobTitle', 'Status', 'SubUnit']

class searchEmployee {

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        inputsFeilds: () => cy.get('.oxd-grid-item'),
        saveBut: () => cy.get('button[type="submit"]'),
        empLoader: () => cy.get('.oxd-loading-spinner'),
        empRow: () => cy.get('.oxd-table-card'),
        editBut: () => cy.get('.oxd-table-cell-action-space')

    }

    searchEmp(arr: keyValue[]) {
        this.elements.MainMenuItems().contains('PIM').click();
        arr.forEach((s) => {
            this.elements.inputsFeilds().contains('.oxd-grid-item', s.key).find('input').type(s.value)
        })
        this.elements.saveBut().click({ force: true })
        this.elements.empRow().should('have.length', 1)
    }

    visitSearchEmp() {
        this.elements.empLoader().should('not.exist')
        this.elements.editBut().eq(1).click()
    }

    verifySearch(infoData: any) {
        this.elements.empRow().find('.oxd-table-cell>div').each(($el, index) => {
            if (index > 0 && index < 7) {
                cy.wrap($el).should('have.text', infoData[searchEmpTb[index - 1]])
            }
        })

    }
}

export default searchEmployee