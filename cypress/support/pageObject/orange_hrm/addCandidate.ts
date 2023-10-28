import { initCandidate } from "../../init/initCandidate";
import { typeInputField } from "../../helpers/genericFuncs";
import { uploadFile } from "../../helpers/genericFuncs";

export default class candidatePage {
    elemnts = {
        buttons: () => cy.get(".oxd-button"),
        inputElms: () => cy.get("input"),
        saveBut: () => cy.get('button[type="submit"]'),
        status: () => cy.get(".orangehrm-recruitment-status"),
        addBut: () => cy.get('button[type="button"]'),
        firstName: () => cy.get('[placeholder="First Name"]'),
        lastName: () => cy.get('[placeholder="Last Name"]'),
        emailInput: () => cy.get('[placeholder="Type here"]'),
        uploadFileInput: () => cy.get('input[type="file"]'),
        resumeInput: () => cy.get(".oxd-input-group"),
    };

    addCandidateAPI(
        contactNumber: string,
        email: string,
        firstName: string,
        lastName: string,
        middleName: string,
        vacancyId: number
    ) {
        return new Cypress.Promise((resolve, reject) => {
            cy.addCandidate(
                "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
                initCandidate(
                    contactNumber,
                    email,
                    firstName,
                    lastName,
                    middleName,
                    vacancyId
                )
            ).then((response) => {
                resolve(response.data.id);
            });
        });
    }

    shortListCandidateAPI(id: number) {
        cy.shortListCandidate(
            `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`
        );
    }

    visitCandidate(id: number) {
        cy.visit(
            `https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${id}`
        );
    }

    addCandidateUI(
        email: string,
        firstName: string,
        lastName: string,
        filePath: string
    ) {
        this.elemnts.addBut().contains("Add").click();
        typeInputField([
            { element: this.elemnts.firstName(), str: firstName },
            { element: this.elemnts.lastName(), str: lastName },
            { element: this.elemnts.emailInput().eq(0), str: email },
        ]);
        uploadFile(this.elemnts.uploadFileInput(), filePath);
        this.elemnts.saveBut().click();
        this.elemnts.resumeInput().contains(filePath.split("/")[2]);
    }

    scheduleInterviewCandiate(
        id: number,
        title: string,
        interviewer: string,
        date: string,
        time: string
    ) {
        this.visitCandidate(id);
        this.elemnts.buttons().eq(1).click({ force: true });
        typeInputField([
            { element: this.elemnts.inputElms().eq(5), str: title },
            { element: this.elemnts.inputElms().eq(7), str: date },
            { element: this.elemnts.inputElms().eq(8), str: time },
        ]);
        this.elemnts
            .inputElms()
            .eq(6)
            .type("a")
            .get(".oxd-autocomplete-option")
            .contains("div", interviewer)
            .click();

        this.elemnts.saveBut().click({ force: true });

        this.elemnts.status().should("contain", " Interview Scheduled");
    }
}
