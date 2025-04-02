import { ENUM_TYPE_USER } from "../../../enums";
import { Restrictions } from "../../../interfaces/restrictions.interface";
import { Paths } from "../../enums/paths.enum";



export class UserRestrictionsService {


    public checkRestrictions(props: Restrictions): boolean {

        if (props.typeUser === ENUM_TYPE_USER.ADMIN) {
            return this.adminUser(props);
        };

        if (props.typeUser === ENUM_TYPE_USER.TESTER) {
            return this.testerUser(props);
        };


        return true;

    };


    private adminUser(props: Restrictions): boolean {
        if(props.url === Paths.USERS_DASHBOARD_BASE_URL) return false;

        return true;

    };

    private testerUser(props: Restrictions): boolean {

        const blockedMethods: string[] = ['POST', 'DELETE'];

        if (props.url === Paths.FEATURE_LOG) return false;
        if (props.url === Paths.REGISTER) return false;
        if (props.url.includes(Paths.USERS_DASHBOARD_BASE_URL)) return false;
        if (props.url.includes(Paths.FEATURE_BASE_URL || Paths.USER_BASE_URL ) && blockedMethods.includes(props.method)) return false;

        return true;
    };

};