export const initVacancy = (desc: string, empID: number, isPub: boolean, jobTit: string, name: string, numOfPosition: number, status: boolean) => {
    let vacancy = {
        description: desc,
        employeeId: empID,
        isPublished: isPub,
        jobTitleId: jobTit,
        name: name,
        numOfPositions: numOfPosition,
        status: status
    }
    return vacancy
}