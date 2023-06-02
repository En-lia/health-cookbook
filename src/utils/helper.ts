import { COLORS } from '../styles/colors';
import { ROLES } from '../../../server/utils/CONST';
import { UserType } from '../service/user/UserAPI';

export const resolveColor = (color:string) => {
    if (!color) return;

    if (COLORS[color]) {
        return COLORS[color];
    }

    return color;
};

export const isAdmin = (user: UserType) => {
    return user?.roles?.find((id:number) => id === ROLES.superadmin);
};