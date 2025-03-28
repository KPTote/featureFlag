
export const actionUserMessage = (action: number, firstName: string, lastName: string): string => {

    switch (action) {
        case 1:
            return `USER CREATED: ${lastName},${firstName}`;
        case 2:
            return `USER UPDATED: ${lastName},${firstName}`;
        case 3:
            return `USER PASS UPDATED: ${lastName},${firstName}`;
        case 4:
            return `USER DELETED: ${lastName},${firstName}`;
        default:
            return 'ACTION NOT IDENTIFY';
    }
};