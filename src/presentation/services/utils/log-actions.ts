import { StatusFeature } from "../../../enums";

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

export const actionFeatureMessage = (name: string, status: StatusFeature, action: number): string => {

    switch (action) {
        case 1:
            return `FEATURE "${name}" CREATED WITH STATUS "${status}"`;
        case 2:
            return `FEATURE "${name}" UPDATED`;
        case 3:
            return `FEATURE STATUS CHANGE TO "${status}"`;
        case 4:
            return `FEATURE "${name}" DELETED`;
        default:
            return `ACTION NOT IDENTIFY`;
    }


};