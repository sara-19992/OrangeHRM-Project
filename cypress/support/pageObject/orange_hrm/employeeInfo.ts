class employeeInfoPage {
  elements = {
    headerName: () => cy.get(".orangehrm-edit-employee-name"),
    empLoader: () => cy.get(".oxd-loading-spinner"),
    selectInputs: () => cy.get(".oxd-select-wrapper"),
    dateIcons: () => cy.get(".oxd-date-input-icon"),
    gender: () => cy.get(".oxd-radio-wrapper"),
    dateCalender: () => cy.get(".oxd-calendar-wrapper"),
    yearDate: () => cy.get(".oxd-calendar-selector-year"),
    monthDate: () => cy.get(".oxd-calendar-selector-month"),
    dayDate: () => cy.get(".oxd-calendar-dates-grid"),
    smokerCheck: () => cy.get(".oxd-checkbox-input"),
    jobBut: () => cy.get(".orangehrm-tabs-item"),
    saveBut: () => cy.get('button[type="submit"]'),
  };

  verfiyEmpName(firstName: string, lastName: string) {
    this.elements.headerName().should("contain", firstName + " " + lastName);
  }

  fillEmpInfo(infoData: any) {
    this.elements.empLoader().should("not.exist");
    this.elements
      .selectInputs()
      .eq(0)
      .click()
      .contains(infoData.Nationality)
      .click({ force: true });
    this.elements
      .selectInputs()
      .eq(1)
      .click()
      .contains(infoData.MaritalStatus)
      .click({ force: true });
    this.elements.gender().contains(infoData.Gender).click({ force: true });
    this.elements.saveBut().eq(0).click();
    this.elements.dateIcons().eq(1).click({ force: true });
    this.elements.yearDate().click().contains(infoData.yearDate).click();
    this.elements.monthDate().click().contains(infoData.monthDate).click();
    this.elements.dayDate().contains(infoData.DayDate).click();
    this.elements.smokerCheck().eq(0).click({ force: true });

    this.elements.jobBut().contains("Job").click({ force: true });
    this.elements.empLoader().should("not.exist");
    this.elements
      .selectInputs()
      .eq(0)
      .click()
      .contains(infoData.JobTitle)
      .click({ force: true });
    this.elements
      .selectInputs()
      .eq(2)
      .click()
      .contains(infoData.SubUnit)
      .click({ force: true });
    this.elements
      .selectInputs()
      .eq(4)
      .click()
      .contains(infoData.Status)
      .click({ force: true });
    this.elements.saveBut().click();

    this.elements.saveBut().click();
  }
}

export default employeeInfoPage;
