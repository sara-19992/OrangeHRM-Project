import loginPage from "../../../support/pageObject/orange_hrm/loginPage";

const login: loginPage = new loginPage();

describe('Verfy Login Page', () => {

  beforeEach(() => {
    cy.visit('/web/index.php')
    cy.fixture('adminLogin').as('users')
  })

  it('Login: valid username and valid password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[0].userName, user[0].password)
      login.verfiyElem(user[0].dashboard_main_menu_item)
    })
  })

  it('Login: Invalid username and valid password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[1].userName, user[1].password)
      login.verfiyElem(user[1].elertMsg)
    })
  })

  it('Login: valid username and Invalid password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[2].userName, user[2].password)
      login.verfiyElem(user[2].elertMsg)
    })
  })

  it('Login: Invalid username and Invalid password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[3].userName, user[3].password);
      login.verfiyElem(user[3].elertMsg);
    })
  })

  it('Login: empty username and empty password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[4].userName, user[4].password);
      login.verfiyElem(user[4].elertMsg);
    })
  })

  it('Login: empty username and non-empty password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[4].userName, user[4].password);
      login.verfiyElem(user[4].elertMsg);
    })
  })

  it('Login: non-empty username and password', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[4].userName, user[4].password);
      login.verfiyElem(user[4].elertMsg);
    })
  })

  it('Login: lowercase userName', () => {
    cy.get('@users').then((user: any) => {
      login.userLogin(user[4].userName, user[4].password);
      login.verfiyElem(user[4].dashboard_main_menu_item);
    })
  })

  it('Login: verfiy password is hidden', () => {
    cy.get('@users').then((user: any) => {
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    })
  })

});
