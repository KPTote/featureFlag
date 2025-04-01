
interface ActionUserMessageProps {
    action: number;
    firstName: string;
    lastName: string;
    email: string;
};


export const actionUserMessage = (props: ActionUserMessageProps): string => {

    switch (props.action) {
        case 1:
            return `USER CREATED: (${props.lastName},${props.firstName})/${props.email}`;
        case 2:
            return `USER UPDATED: (${props.lastName},${props.firstName})/${props.email}`;
        case 3:
            return `USER PASS UPDATED: (${props.lastName},${props.firstName})/${props.email}`;
        case 4:
            return `USER DELETED: (${props.lastName},${props.firstName})/${props.email}`;
        default:
            return 'ACTION NOT IDENTIFY';
    }
};