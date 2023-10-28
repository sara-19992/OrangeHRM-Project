class leave {

    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),

    }

    goToLeave() {
        this.elements.MainMenuItems().contains('Leave').click()
    }

    searchLeaveStatus() {
        this.goToLeave()
    }
}