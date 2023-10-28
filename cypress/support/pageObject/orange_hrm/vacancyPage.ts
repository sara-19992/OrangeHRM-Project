import { uploadFile } from "../../helpers/genericFuncs"
import { initVacancy } from "../../init/initVacancy"


export default class vacancyPage {
    elements = {
        addBut: () => cy.get('button[type="button"]'),
        fileInputField: () => cy.get('input[type="file"]'),
        saveButs: () => cy.get('button[type="submit"]'),
        attachmentRows: () => cy.get('.oxd-table-card')
    }

    addVacancyAPI(desc: string, empID: number, isPub: boolean, jobTit: string, name: string, numOfPosition: number, status: boolean) {
        const vacancyPayload = initVacancy(desc, empID, isPub, jobTit, name, numOfPosition, status)
        return new Cypress.Promise((resolve, reject) => {
            cy.api({
                method: 'POST',
                url: '/web/index.php/api/v2/recruitment/vacancies',
                body: vacancyPayload
            }).then((response) => {
                resolve(response.body.data.id)
                cy.log('**Vacancy Added Successfully**')
            })
        })
    }

    visitVacancy(id: number) {
        cy.visit(`/web/index.php/recruitment/addJobVacancy/${id}`)
    }

    uploadVacancyAttachment(filePath: string) {
        this.elements.addBut().contains('Add').click()
        uploadFile(this.elements.fileInputField(), filePath)
        this.elements.saveButs().eq(1).click()
        this.elements.attachmentRows().should('have.length', 1)
        this.elements.attachmentRows().contains(filePath.split("/")[2])
        cy.log('**File uploaded Successfully For Vacancy**')
    }

    deleteVacancyAPI(id: number) {
        cy.api({
            method: 'DELETE',
            url: '/web/index.php/api/v2/recruitment/vacancies',
            body: {
                ids: [id]
            }
        }).then(() => {
            cy.log('**Vacancy Deleted Successfully**')
        })
    }
}
