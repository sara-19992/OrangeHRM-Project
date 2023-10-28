
import { initLeave } from "../../init/initLeave";

export default class leavePage {
    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        leavesRecords: () => cy.get('.oxd-table-card')
    }

    goToLeave() {
        this.elements.MainMenuItems().contains('Leave').click()
    }

    addEmpEntitlementAPI(empNum: number, entitlement: number, fromDate: string, toDate: string, leaveId: number) {
        cy.api({
            method: 'POST',
            url: '/web/index.php/api/v2/leave/leave-entitlements',
            body: {
                empNumber: empNum,
                entitlement: entitlement,
                fromDate: fromDate,
                leaveTypeId: leaveId,
                toDate: toDate
            }
        }).then((response) => {
            cy.log('**Add Entitlement For Employee Successfully**')
        })
    }

    addEmpLeaveAPI(comment: object, duration: object, fromDate: string, toDate: string, leaveId: number) {
        const leavePayload = initLeave(comment, duration, fromDate, toDate, leaveId)
        return new Cypress.Promise((resolve, reject) => {
            cy.api({
                method: 'POST',
                url: '/web/index.php/api/v2/leave/leave-requests',
                body: leavePayload
            }).then((response) => {
                resolve(response.body.data.id)
                cy.log('**Add New Leave For Employee Successfully**')
            })
        })

    }

    approveLeaveAPI(id: number) {
        cy.api({
            method: 'PUT',
            url: `/web/index.php/api/v2/leave/employees/leave-requests/${id}`,
            body: {
                action: "APPROVE"
            }
        }).then(() => {
            cy.log('**Approve Leave Successfully**')
        })
    }

    verfeyLeaveStatus(status: string) {
        this.elements.leavesRecords().should('have.length', 1).contains(status)
    }




}
