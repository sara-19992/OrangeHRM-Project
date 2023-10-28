import loginPage from "../../../support/pageObject/orange_hrm/loginPage";
import employeeAPI from "../../../support/api/employeeAPI"
import leavePage from "../../../support/pageObject/orange_hrm/leavePage";

const login: loginPage = new loginPage();
const empAPI: employeeAPI = new employeeAPI();
const leave: leavePage = new leavePage()

let empNum: any
let leaveId: any

describe('Employee leave functionality', () => {
    beforeEach(() => {
        cy.visit('/web/index.php')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })
        cy.fixture('employeeInfo').then((infoData: any) => {
            empAPI.addEmployee(infoData.EmployeeId, infoData.FirstName, infoData.LastName, infoData.MiddleName, infoData.username, infoData.password).then((resolve) => {
                empNum = resolve
                leave.addEmpEntitlementAPI(empNum, infoData.entitlement, infoData.fromDate, infoData.toDate, infoData.leaveTypeId)
            })
        })
        login.userLogout()
    })

    it('Login employee and add leave', () => {
        cy.visit('/web/index.php')
        cy.fixture('employeeInfo').then((infoData: any) => {
            login.userLogin(infoData.username, infoData.password)
        })

        cy.fixture('leave').then((myLeave: any) => {
            leave.addEmpLeaveAPI(myLeave.comment, myLeave.duration, myLeave.fromDate, myLeave.toDate, myLeave.leaveTypeId).then((resolve) => {
                leaveId = resolve

                login.userLogout()

                cy.fixture('adminLogin').then((user: any) => {
                    login.userLogin(user[0].userName, user[0].password)
                })

                leave.goToLeave()

                leave.approveLeaveAPI(leaveId)
            })
        })

        login.userLogout()

        cy.fixture('employeeInfo').then((infoData: any) => {
            login.userLogin(infoData.username, infoData.password)
        })

        leave.goToLeave()

        leave.verfeyLeaveStatus('Schedule')

        login.userLogout()
    })

    afterEach(() => {
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })
        empAPI.deleteEmployee(empNum)
    })
})

