import { genericString } from "../helpers/genericFuncs"

class employee {

    elements = {
        empLoader: () => cy.get('.oxd-loading-spinner')
    }

    addEmployee(empID: string, firstName: string, lastName: string, middleName: string, username: string, password: string) {
        //add new employee using API
        return new Cypress.Promise((resolve, reject) => {
            cy.request({
                method: 'POST',
                url: '/web/index.php/api/v2/pim/employees',
                body: {
                    empPicture: null,
                    employeeId: empID,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName
                }
            }).then((response) => {
                cy.log('**Add New Employee Successfully**')
                this.addUser(response.body.data.empNumber, username, password)
                resolve(response.body.data.empNumber)
            })
        })
    }


    addUser(id: number, username: string, password: string) {
        //create user login details for new employee
        cy.request({
            method: 'POST',
            url: '/web/index.php/api/v2/admin/users',
            body: {
                empNumber: id,
                password: password,
                status: true,
                userRoleId: 2,
                username: username
            }
        }).then((response) => {
            cy.log('**Create Login Detailes For New Empolyee**')
        })
    }

    deleteEmployee(empNum: string) {
        cy.request({
            method: 'DELETE',
            url: '/web/index.php/api/v2/admin/users',
            body: {
                ids: [empNum]
            }
        }).then((response) => {
            expect(response).property('status').to.equal(200)

            cy.request({
                method: 'DELETE',
                url: '/web/index.php/api/v2/pim/employees',
                body: {
                    ids: [empNum]
                }
            }).then((response) => {
                cy.log('**Delete New Employee Successfully**')
            })
        })
    }

}

export default employee
