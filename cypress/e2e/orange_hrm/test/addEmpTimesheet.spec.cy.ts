import loginPage from "../../../support/pageObject/orange_hrm/loginPage";
import employeeAPI from "../../../support/api/employeeAPI";
import timPage from "../../../support/pageObject/orange_hrm/timePage";
import { getCurrentDate } from "../../../support/helpers/genericFuncs";

const login: loginPage = new loginPage();
const empAPI: employeeAPI = new employeeAPI();
const time: timPage = new timPage();

let empNum: any
let timeID: any

describe('Employee Timesheet Functionality', () => {

    beforeEach(() => {
        cy.visit('/web/index.php')
        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })
        cy.fixture('employeeInfo').then((infoData: any) => {
            empAPI.addEmployee(infoData.EmployeeId, infoData.FirstName, infoData.LastName, infoData.MiddleName, infoData.username, infoData.password).then((resolve) => {
                empNum = resolve
            })
        })
        login.userLogout()
    })

    afterEach(() => {
        time.goToTimePage()
        empAPI.deleteEmployee(empNum)
    })

    it('Add new Timesheet For New Employee', () => {
        cy.visit('/web/index.php')
        cy.fixture('employeeInfo').then((infoData: any) => {
            login.userLogin(infoData.username, infoData.password)
        })

        time.goToTimePage()

        const date = getCurrentDate()
        time.getTimesheetID(date).then((resolve) => {
            timeID = resolve

            time.addTimesheetEntires(timeID)

            time.submitTimesheet(timeID)
        })

        login.userLogout()

        cy.fixture('adminLogin').then((user: any) => {
            login.userLogin(user[0].userName, user[0].password)
        })

        time.goToTimePage()

        cy.fixture('employeeInfo').then((infoData: any) => {
            time.verfeyTimeEmployeeName(infoData.FirstName + " " + infoData.LastName)
        })
    })
})