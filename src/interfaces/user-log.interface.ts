export interface UserHistoryLog{
    logId: number;
    dateTime: Date;
    details: string;
    executedBy: string;
}

interface PerformedByUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


export interface CreateUserLog{
    firstName: string;
    lastName: string;
    action: number;
    actionMessage: string;
    emailExecutedBy: string;
    emailUserAffected: string;
}

export interface IntoUserLog {
    firstName: string;
    lastName: string;
    action: number;
    email: string;
};