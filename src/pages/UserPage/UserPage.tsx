import React, { FC, useState, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Avatar } from 'antd';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faUser, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserType } from '../../service/user/UserAPI';
import classes from './UserPage.module.scss';
import Favorites from './Favorites/Favorites';
import Detox from './Detox/Detox';
import MenuBook from './MenuBook/MenuBook';
import { DETOX_PAGE_ROUTE } from '../../utils/const';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Данные пользователя', 'user', <FontAwesomeIcon
        icon={faUser}
        size="xl"
    />),
    getItem('Избранное', 'favorites', <FontAwesomeIcon
        icon={faBookmark}
        size="lg"
    />),
    getItem('Меню на неделю', 'menubook', <FontAwesomeIcon
        icon={faBookBookmark}
        size="lg"
    />),
    getItem('Детокс программы', 'detox', <FontAwesomeIcon
        icon={faCalendarDays}
        size="lg"
    />, [
        getItem('Весна 2022', 'detox/1'),
        getItem('Осень 2022', 'detox/2'),
        getItem('Весна 2023', 'detox/3'),
    ]),
];

const rootSubmenuKeys = ['user', 'favorites', 'recipeBook', 'detox'];

const UserPage: FC = () => {
    const { pathname } = useLocation();
    const currentItem = useMemo(() => pathname.replace('/', ''), [pathname]);
    const navigate = useNavigate();

    const client = useQueryClient();
    const user: UserType = client.getQueryData('user');

    const [openKeys, setOpenKeys] = useState(['detox']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onMenuItemSelect: MenuProps['onSelect'] = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        if (key.indexOf('detox') !== -1) {
            const id = key.replace('detox/', '');

            navigate(`${DETOX_PAGE_ROUTE}/${id}`);
        } else {
            navigate(`/${key}`);
        }
    };

    const userInfo = useMemo(() => {
        return (
            <div>
                <h2 className={classes.userPageContentTitle}>Данные пользователя</h2>
                <div className={classes.userPageInfo}>
                    <Avatar size={100} style={{ backgroundColor: '#9b9d78' }} icon={<UserOutlined />} />
                    <div>
                        <div className={classes.userPageInfoItem}>
                            <h3 className={classes.userPageInfoTitle}>Имя</h3>
                            <span>{user.name}</span>
                        </div>
                        <div className={classes.userPageInfoItem}>
                            <h3 className={classes.userPageInfoTitle}>E-mail</h3>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>

            </div>
        );
    }, [user.email, user.name]);

    return (
        <div className={classes.userPage}>
            <h1 className={classes.userPageTitle}>Личный кабинет</h1>

            <div className={classes.userPageContent}>
                <div className={classes.userPageNavbar}>
                    <Menu
                        mode="inline"
                        openKeys={openKeys}
                        selectedKeys={[currentItem]}
                        onOpenChange={onOpenChange}
                        onSelect={onMenuItemSelect}
                        items={items}
                    />
                </div>
                {currentItem === 'user' && userInfo}
                {currentItem === 'favorites' && <Favorites />}
                {currentItem === 'menubook' && <MenuBook />}
                {currentItem.indexOf('detox') !== -1 && <Detox />}
            </div>
        </div>
    );
};

export default UserPage;