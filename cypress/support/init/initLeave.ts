export const initLeave = (comment: object, duration: object, fromDate: string, toDate: string, leaveId: number) => {
    let leave = {
        comment: comment,
        duration: duration,
        fromDate: fromDate,
        leaveTypeId: leaveId,
        toDate: toDate,
    }
    return leave
}
