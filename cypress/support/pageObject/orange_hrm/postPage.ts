
export default class postPage {
    elements = {
        MainMenuItems: () => cy.get('.oxd-main-menu'),
        postInput: () => cy.get('textarea'),
        postBut: () => cy.get('button[type="submit"]'),
        postBody: () => cy.get('.orangehrm-buzz-post-body')
    }

    goToBuzzPage() {
        this.elements.MainMenuItems().contains('Buzz').click({ force: true })
    }

    newPost(input: string) {
        this.elements.postInput().type(input)
        this.elements.postBut().click()
        this.elements.postBody().contains(input)
    }

}
