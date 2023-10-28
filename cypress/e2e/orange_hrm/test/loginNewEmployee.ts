import loginPage from "../../../support/pageObject/orange_hrm/loginPage";
import employeeAPI from "../../../support/api/employeeAPI";
import employee from "../../../support/pageObject/orange_hrm/addEmployee";
import employeeInfoPage from "../../../support/pageObject/orange_hrm/employeeInfo";
import searchEmployee from "../../../support/pageObject/orange_hrm/searchEmployee";


const login: loginPage = new loginPage();
const empAPI: employeeAPI = new employeeAPI();
const emp: employee = new employee();
const search: searchEmployee = new searchEmployee();

let id: any = 0

describe('Login new Employee', () => {

    beforeEach(() => {
        cy.visit('/web/index.php')
        cy.fixture('employeeInfo').as('EmpInfo')
        login.userLogin('Admin', 'admin123')
    })

    it('Add new employee use API and Login', () => {
        cy.get('@EmpInfo').then((infoData: any) => {
            empAPI.addEmployee(infoData.EmployeeId, infoData.FirstName, infoData.LastName, infoData.MiddleName, infoData.username, infoData.password).then((resolve) => {
                id = resolve
                login.userLogout()
                //login with new Employee
                login.userLogin(infoData.username, infoData.password)
                //logout again
                login.userLogout()
            })
        })
    })

    afterEach(() => {
        cy.visit('/web/index.php')
        login.userLogin('Admin', 'admin123')
        empAPI.deleteEmployee(id);
    })

})
