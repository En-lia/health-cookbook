import React, { FC, useMemo, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import { useQueryClient } from 'react-query';
import {
    ADMIN_ROUTE, DETOX_PAGE_ROUTE,
    FAVORITES_PAGE_ROUTE,
    LOGIN_ROUTE,
    MENUBOOK_PAGE_ROUTE,
    RECIPE_ROUTE,
    USER_PAGE_ROUTE,
} from '../../utils/const';
import classes from './UserMenu.module.scss';
import { ROLES } from '../../../../server/utils/CONST';
import HCButton from '../UI/Button/HCButton';
import { Context } from '../App/App';
import { UserType } from '../../service/user/UserAPI';
import RecipeCard from '../RecipeCard/RecipeCard';
import { isAdmin } from '../../utils/helper';

const UserMenu: FC = observer(() => {
    const navigate = useNavigate();
    const { user: userStore } = useContext(Context);

    const queryClient = useQueryClient();
    const user: UserType = queryClient.getQueryData('user');

    const logOut = useCallback(() => {
        userStore.setIsAuth(false);
        localStorage.removeItem('token');
        queryClient.removeQueries(['user']);
        navigate(LOGIN_ROUTE);
    }, [navigate, queryClient, userStore]);

    const items: MenuProps['items'] = useMemo(() => {
        return [
            {
                label: <div className={classes.userMenuItem} onClick={() => { navigate(USER_PAGE_ROUTE); }}>Личный кабинет</div>,
                key: '0',
            },
            {
                label: <div className={classes.userMenuItem} onClick={() => { navigate(FAVORITES_PAGE_ROUTE); }}>Избранное</div>,
                key: '1',
            },
            {
                label: <div className={classes.userMenuItem} onClick={() => { navigate(MENUBOOK_PAGE_ROUTE); }}>Меню на неделю</div>,
                key: '2',
            },
            {
                label: <div className={classes.userMenuItem} onClick={() => { navigate(DETOX_PAGE_ROUTE); }}>Детокс программа</div>,
                key: '3',
            },
            {
                type: 'divider',
            },
            {
                label:
    <>
        {isAdmin(user)
            && (
                <HCButton className={classes.userMenuItem} onClick={() => navigate(ADMIN_ROUTE)}>
                    <FontAwesomeIcon
                        className={classes.userMenuIcon}
                        icon={faGear}
                        size="lg"
                    />
                    Панель админа
                </HCButton>
            )}
    </>,
                key: '4',
            },
            {
                label:
    <HCButton onClick={logOut} className={classes.userMenuItem}>
        <FontAwesomeIcon
            className={classes.userMenuIcon}
            icon={faRightFromBracket}
            size="lg"
        />
        Выход
    </HCButton>,
                key: '5',
            },
        ];
    }, [logOut, navigate, user]);

    return (
        <Dropdown menu={{ items }} trigger={['click']} placement="bottom" className={classes.userMenu}>
            <HCButton>
                <FontAwesomeIcon
                    icon={faUser}
                    size="xl"
                />
            </HCButton>
        </Dropdown>
    );
});

export default UserMenu;