import loginPage from "../../../support/pageObject/orange_hrm/loginPage";
import employeeAPI from "../../../support/api/employeeAPI";
import employee from "../../../support/pageObject/orange_hrm/addEmployee";
import employeeInfoPage from "../../../support/pageObject/orange_hrm/employeeInfo";
import searchEmployee from "../../../support/pageObject/orange_hrm/searchEmployee";


const login: loginPage = new loginPage();
const empAPI: employeeAPI = new employeeAPI();
const emp: employee = new employee();
const infoPage: employeeInfoPage = new employeeInfoPage();
const search: searchEmployee = new searchEmployee();

describe('Add / Edit / Search Employee', () => {


    beforeEach(() => {
        cy.visit('/web/index.php')
        login.userLogin('Admin', 'admin123')
        cy.fixture('employeeInfo').as('EmpInfo')
    })

    it('Add new employee use API', () => {
        cy.get('@EmpInfo').then((infoData: any) => {
            empAPI.addEmployee(infoData.EmployeeId, infoData.FirstName, infoData.LastName, infoData.MiddleName, infoData.username, infoData.password)
        })
    })

    it('Fill the new employee information', () => {
        cy.get('@EmpInfo').then((infoData: any) => {
            search.searchEmp([{ key: 'Employee Id', value: infoData.EmployeeId }])
            search.visitSearchEmp()
            infoPage.verfiyEmpName(infoData.FirstName, infoData.LastName)
            infoPage.fillEmpInfo(infoData)
        })
    })

    it('Search for the new employee and assertion table data', () => {
        cy.get('@EmpInfo').then((infoData: any) => {
            search.searchEmp([{ key: 'Employee Id', value: infoData.EmployeeId }])
            search.verifySearch(infoData)
        })
    })

    after(() => {
        //delete the addad employee
        cy.get('@EmpInfo').then((infoData: any) => {
            search.searchEmp([{ key: 'Employee Id', value: infoData.EmployeeId }])
            emp.deleteEmployee()
            // empAPI.deleteEmployee(win.sessionStorage.getItem("empNum"));
        })
    })

})
