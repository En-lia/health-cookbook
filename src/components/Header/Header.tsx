import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import classes from './Header.module.scss';
import Filter from '../Filter/Filter';
import SearchPanel from '../SearchPanel/SearchPanel';
import { Context } from '../App/App';
import { MAIN_PAGE_ROUTE } from '../../utils/const';
import UserMenu from '../UserMenu/UserMenu';
import logo from '/src/assets/images/logov4.jpg'

const Header: FC = observer(() => {
    const { user } = useContext(Context);

    return (
        <div>
            <header className={classes.header}>
                <Link className={classes.headerLogo} to={MAIN_PAGE_ROUTE}>
                    <img
                        src={logo}
                        alt="logo"
                        className={classes.headerLogoIcon}
                    />
                    <div className={classes.headerLogoText}>HEALTH cookbook</div>
                </Link>

                <div className={classes.headerSearchPanel}>
                    <SearchPanel />
                </div>

                <div className={classes.headerButtonsPanel}>
                    {user.isAuth && <UserMenu />}
                    {/* <Menu /> */}
                </div>
            </header>
        </div>
    );
});

export default Header;