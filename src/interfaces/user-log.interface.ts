export interface UserHistoryLog{
    logId: number;
    dateTime: Date;
    details: string;
    performedByUser: PerformedByUser;
}

interface PerformedByUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


export interface CreateUserLog{
    id: number;
    firstName: string;
    lastName: string;
    action: number;
    actionMessage?: string;
    email?: string;
}

export interface IntoUserLog {
    firstName: string;
    lastName: string;
    action: number;
    email: string;
};