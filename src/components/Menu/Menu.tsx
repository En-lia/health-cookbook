import React, { FC } from 'react';
import classes from './Menu.module.scss';

const Menu: FC = () => (
    <div>
        <div className={classes.burgerMenu}>
            <input
                id="menu-toggle"
                className={classes.menuToggle}
                type="checkbox"
            />
            <label
                className={classes.menuBtn}
                htmlFor="menu-toggle"
            >
                <span />
            </label>
        </div>
    </div>
);

export default Menu;