import { typeInputField } from "../../helpers/genericFuncs";

const timeURl = '/web/index.php/api/v2/time/timesheets/';

export default class timPage {
    elements = {
        MainMenuItems: () => cy.get('.oxd-main-menu'),
        empName: () => cy.getByPlaceholder("Type for hints..."),
        viewBut: () => cy.get('button[type="submit"]'),
        selectEmp: () => cy.get('.oxd-autocomplete-option'),
        timesheetStatus: () => cy.get('.orangehrm-timesheet-footer--title')
    }

    goToTimePage() {
        this.elements.MainMenuItems().contains('Time').click({ force: true })
    }

    getTimesheetID(date: string) {
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'GET',
                url: `${timeURl}default?date=${date}`,
            }).then((response) => {
                resolve(response.body.data.id)
            })
        })
    }

    addTimesheetEntires(id: number) {
        cy.api({
            method: 'PUT',
            url: `${timeURl + id}/entries`,
            body: {
                entries: [
                    {
                        projectId: 2,
                        activityId: 11,
                        dates: { "2023-10-23": { duration: "09:00" } },
                    },
                ],
                deletedEntries: [],
            },
        }).then(() => {
            cy.log('**Add Time Entires Successfully**')
        })
    }

    submitTimesheet(id: number) {
        cy.api({
            method: 'PUT',
            url: `${timeURl + id}`,
            body: {
                action: "SUBMIT"
            }
        }).then(() => {
            cy.log('**Submit Time Entires Successfully**')
        })
    }

    verfeyTimeEmployeeName(name: string) {
        typeInputField([{ element: this.elements.empName(), str: name }])
        this.elements.selectEmp().contains('span', name).click()
        this.elements.viewBut().click({ force: true })
        this.elements.timesheetStatus().contains('Submitted')
        cy.log('**Verfey Employee Timesheet**')
    }
}
