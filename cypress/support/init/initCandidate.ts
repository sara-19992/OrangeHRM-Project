export const initCandidate = (contactNumber: string, email: string, firstName: string, lastName: string, middleName: string, vacancyId: number) => {
    let candidate = {
        comment: null,
        consentToKeepData: false,
        contactNumber: contactNumber,
        dateOfApplication: "2023-10-14",
        email: email,
        firstName: firstName,
        keywords: null,
        lastName: lastName,
        middleName: middleName,
        vacancyId: vacancyId
    }
    return candidate
}